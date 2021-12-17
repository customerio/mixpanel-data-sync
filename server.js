const express = require('express')
const customers = require('./helpers/customers')

app = express();
app.use(express.json({limit:'200mb'})); //Used to parse JSON bodies
app.use(express.urlencoded({limit:'200mb'})); //Parse URL-encoded bodies

app.post('/', async (req,res) => {

    const action = req.body.action
    const members = req.body.parameters.members
    const cohort_id = req.body.parameters.mixpanel_cohort_id

    console.log('cohort:', cohort_id)
    console.log('action:', action)
    console.log('members:', members.length)

    res.json({
        "action": action,
        "status": "success"
    })

    if (action === 'remove_members'){
        
        for (let member of members){
            let email = member.email
            await customers.delete_customer(email)
        }

    } else {

        for (let member of members){
            let email = member.email
            await customers.add_update_customer(email, member)
        }
    }
    
})

app.listen(8080)