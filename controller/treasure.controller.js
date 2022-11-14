import {Treasures} from "../model/treasure.model";
import {MoneyValue} from "../model/money_value.model";
import {QueryTypes} from "sequelize";
import {db} from "../utils/db";
import {checkRequiredFields, distanceValueValid, priceValueValid} from "../utils";

Treasures.hasMany(MoneyValue, {foreignKey: 'treasure_id'})
MoneyValue.belongsTo(Treasures, {foreignKey: 'treasure_id'})

export const findTreasureBoxes = (req, res) => {
    try {
        const query = req.query;
        const currentUser = req.currentUser;
        let requiredFields = [
            'Latitude',
            'Longitude',
            'Distance'
        ]
        let checkErrors = checkRequiredFields(requiredFields, query) //check if all required fields exist
        if (checkErrors.length)
            throw Error(`Missing required fields: ${checkErrors.toString()}`)

        if (query.Distance) { //check distance value
            let checkDistanceValue = distanceValueValid(query.Distance);
            if (checkDistanceValue.error)
                throw Error(checkDistanceValue.message)
        }

        if (query['Prize value']) { //check prize value
            let checkPriceValue = priceValueValid(query['Prize value']);
            if (checkPriceValue.error)
                throw Error(checkPriceValue.message)
        }
        //find Treasures from database where latitude and longitude is inside the given distance
        db.query(
            `SELECT T.Name, T.Latitude, T.Longitude,(((acos(sin((?*pi()/180)) * sin((\`Latitude\`*pi()/180))+cos((?*pi()/180))*cos((\`Latitude\`*pi()/180)) * cos(((?-\`Longitude\`)*pi()/180))))*180/pi())*60*1.1515*1.609344)
                 as Distance, MV.amt 
                 FROM treasures T
                 INNER JOIN money_values MV
                 ON MV.treasure_id = T.id
                 HAVING (Distance <= ?) 
            `,
            {
                replacements: [parseFloat(query.Latitude), parseFloat(query.Latitude), parseFloat(query.Longitude), parseInt(query.Distance)], // cleaned values (SQL Injection SAFE)
                type: QueryTypes.SELECT
            }
        ).then((result) => {
            let returnValue = [];
            let message = 'No Treasures found near the given coordinates :(';
            if (query['Prize value']) { // if prize value parameter is passed
                //Group results
                let temp = result.reduce(
                    (entryMap, e) => entryMap.set(e.Name, [...entryMap.get(e.Name) || [], e]),
                    new Map()
                );
                for (let item of temp) {
                    //Get minimum value for those that have more than 1 money value
                    returnValue.push(
                        item[1].reduce(function (prev, curr) {
                            return prev.amt < curr.amt ? prev : curr;
                        })
                    )
                }
            } else { // if no prize parameter is passed
                returnValue = [...new Map(result.map(item => [item['Name'], {
                    Name: item.Name,
                    Latitude: item.Latitude,
                    Longitude: item.Longitude,
                    Distance: item.Distance
                }])).values()];
            }
            if (returnValue && returnValue.length)
                message = `Congratulations ${currentUser.name}! You have found ${returnValue.length} Treasures near the given coordinates!!!`
            res.send({
                success: true,
                message,
                treasuresLocation: returnValue
            })
        }).catch((error) => {
            res.status(400).json({
                code: 400,
                status: "failed",
                message: error.message,
            });
        })

    } catch (e) {
        res.status(400).json({
            code: 400,
            status: "failed",
            message: e.message,
        });
    }
}

export const addTreasureBoxes = (req, res) => {
    try {
        const props = req.body;
        let requiredFields = [
            'Latitude',
            'Longitude',
            'Name',
            'Prize value'
        ]
        let checkErrors = checkRequiredFields(requiredFields, props) //check if all required fields exist
        if (checkErrors.length)
            throw Error(`Missing required fields: ${checkErrors.toString()}`)
        if (props['Prize value']) { //check prize value
            let checkPriceValue = priceValueValid(props['Prize value'].toString());
            if (checkPriceValue.error)
                throw Error(checkPriceValue.message)
        }
        //check if Treasure name already exist
        Treasures.findOne({
            where: {
                Name: props.Name
            }
        }).then((checkTreasureResult) => {
            if(checkTreasureResult && checkTreasureResult.dataValues) // return error if Treasure name already exist
                return res.send({
                    success: false,
                    message: "Treasure name already exist."
                })
            Treasures.create({ // register new user
                Latitude: props.Latitude,
                Longitude: props.Longitude,
                Name: props.Name,
            }).then((newTreasureResult) => {
                // creating new treasure boxes success
                // add money value
                MoneyValue.create({ // register new user
                    treasure_id: newTreasureResult.dataValues.id,
                    amt: props['Prize value'],
                }).then((newTreasureResult) => {
                    res.send({
                        success: true
                    })
                })
            }).catch((error) => {
                // an error happened when creating a treasure boxes
                res.status(400).json({
                    code: 400,
                    status: "failed",
                    message: "An error has occurred, please try again or contact administrator/support.",
                });
            })
        })

    } catch (e) {
        res.status(400).json({
            code: 400,
            status: "failed",
            message: e.message,
        });
    }
}