var express = require('express');
var router = express.Router();
var Subject = require('../models/Subject');
//var Task = require('../models/Task');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/getSubId/:id',function(req,res,next){
    Subject.getSubId(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
    
 });

function getAll(rows) {
         
                for (var i = 0; i < rows.length; i++) {
                        //console.log(rows[i].assignments);
                        rows[i].assignments = JSON.parse(rows[i].assignments);
                }
		for(var i = 0; i < rows.length; i++)
                {
                        if(rows[i].assignments[0].name == null)
                        {
                                rows[i].assignments.length = 0;
                        }
                }
                return rows;
                //res.send("NATASHA");
}

router.get('/getAll/:id',function(req,res,next){

    Subject.getSubjectsAndAssignmentByUserId(req.params.id, function(err, rows){

		if(err)
	    {
		    res.send("failed");
	    }
	    else
	    {
		    res.send(getAll(rows));
	    }

    });
	    /* function(err, rows) {
	    if (err) {
		res.send("failure");
	    } else {
		for (var i = 0; i < rows.length; i++) {
			//console.log(rows[i].assignments);
			rows[i].assignments = JSON.parse(rows[i].assignments);
		}
		res.send(rows);
		//res.send("NATASHA");
	    }
    });*/
});

router.post('/updateSubjectName', function(req, res, next){
    Subject.updateSubjectName(req.body, function(err,rows){
	if(err){
	    res.send("failed");
	}
	else{
	    if(rows.changedRows <= 0){
		res.send("failed");
	    }
	    else
    	    {
	    	Subject.getSubjectsAndAssignmentByUserId(req.body.user_id, function(err, rows){

            		if(err)
            		{
                    		res.send("failed");
            		}
            		else
            		{
                    		res.send(getAll(rows));
           		}

    		});
	    }
	}
    });

});
	
router.post('/addSubject',function(req,res,next){
    Subject.addSubject(req.body,function(err,rows){
        if(err){
            res.send("failed");
        }
        else{
             Subject.getSubjectsAndAssignmentByUserId(req.body.user_id, function(err, rows){

                if(err)
            {
                    res.send("failed 2");
            }
            else
            {
                    res.send(getAll(rows));
            }

    });
	}
    });
});

router.delete('/deleteSubject/:id',function(req,res,next){
    Subject.deleteSubject(req.params.id,function(err,rows){
	    //console.log(rows);
        if(err){
            res.send("failed");
        }
        else{
	    if(rows.affectedRows <= 0){	
                res.send("failed");
	    }
	    else{
		res.send("success");
	    }
        }
    });
});
module.exports=router;
