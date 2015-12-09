//rest is the time before a movement (seconds)
//time is the time during a movement until the next movement starts (seconds)
//lift type is a type of analysis (clean)
//lift name is the specific type (squat clean)
//load, under 2 is percent, over 2 is lbs
//lift Type, lift name, reps, load,which max it uses, rest, time

workoutData = [
	{'date':'09/22/14',
	'title': 'Invictus Competition - 09/22/14 A',
    'id':1,
    'series':'Invictus Competition',
    'description':'Every 30 seconds, for 15 minutes (10 sets of each) perform the following:</br>'+
                        '-Interval 1 (30s) - Drop Snatch x 1 rep</br>'+
                        '-Interval 2 (60s) - High Hang Snatch x 1 rep</br>'+
                        '-Interval 3 (90s) - Snatch x 1 rep</br>'+
                        '-Perform all movements at 65-70% of your 1-RM Snatch. If you aren’t confident performing a drop snatch with 65%, '+ 
                        'modify the movement to a Snatch Balance and allow yourself to dip and drive a bit.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30],
                [2,"Drop Snatch",1,.65,0,0,30],
                [2,"High Hang Snatch",1,.65,0,0,30],
                [2,"Snatch",1,.65,0,0,30]
    ]},
	{'date':'09/22/14',
	'title': 'Invictus Competition - 09/22/14 B',
    'id':2,
    'series':'Invictus Competition',
    'description':'Every minute, on the minute, for 10 minutes:</br>'+
			'Strict Shoulder Press x 1 rep</br>'+
			'Loads per set (by %): 55, 65, 70, 75, 80, 85, 90, 95, 95+, 95+ </br></br>'+
			'Once you have found your 1-RM (which you will use for this entire cycle), then perform the following:</br>'+
			'Two sets of:</br>'+
			'--Strict Shoulder Press x Max Reps @ 75% of today’s 1-RM</br>'+
			'--Rest 3 minutes',
	'requiredMaxes':['Shoulder Press 1RM'],
    'workout': [//This is a series of steps
                [6,"Strict Shoulder Press",1,.55,0,0,60],
                [6,"Strict Shoulder Press",1,.65,0,0,60],
                [6,"Strict Shoulder Press",1,.70,0,0,60],
                [6,"Strict Shoulder Press",1,.75,0,0,60],
                [6,"Strict Shoulder Press",1,.80,0,0,60],
                [6,"Strict Shoulder Press",1,.85,0,0,60],
                [6,"Strict Shoulder Press",1,.90,0,0,60],
                [6,"Strict Shoulder Press",1,.95,0,0,60],
                [6,"Strict Shoulder Press",1,1.0,0,0,60],
                [6,"Strict Shoulder Press",1,1.05,0,0,60],          
    ]},
    {'date':'09/23/14',
	'title': 'Invictus Competition - 09/23/14 A',
    'id':3,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 20 minutes (10 sets) of:</br>'+
			'Power Clean + Hang Clean + High Hang Clean</br>'+
			'*Sets 1-3 - 55-60%</br>'+
			'*Sets 4-6 - 60-65%</br>'+
			'*Sets 7-8 - 65-70%</br>'+
			'*Sets 9-10 - 70-75%',
	'requiredMaxes':['Clean 1RM'],		
    'workout': [//This is a series of steps
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.60,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.60,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.60,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.65,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.65,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.65,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.70,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.70,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.75,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.75,0,0,120]
    ]},
    {'date':'09/23/14',
	'title': 'Invictus Competition - 09/23/14 B',
    'id':4,
    'series':'Invictus Competition',
    'description':'Four sets of:</br>'+
		'Front Squat x 5-6 reps @ 41X1</br>'+
		'Rest 3 minutes</br>'+
		'Please note the tempo prescription - this is a slow, 4-second descent followed by a 1-second pause at the bottom. The athlete should then attempt to move the barbell quickly back to the starting position, pause for a full breath and brace at the top, and repeat for 5-6 reps. If you are new to the site and tempo prescriptions, please read here.</br></br>'+
		'I hesitate to give percentage prescriptions here because they could vary wildly for each athlete. Start around 70% and use today to build to figure out what you are capable of for this rep scheme. In the upcoming weeks I will be asking you to increase the loading by approximately 5% each week, so be sure to track your results.',
    'requiredMaxes':['Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,'Front Squat',6,.70,0,180,0],
                [5,'Front Squat',6,.70,0,180,0],
                [5,'Front Squat',6,.70,0,180,0],
                [5,'Front Squat',6,.70,0,0,0]
    ]},
    {'date':'09/24/14',
	'title': 'Invictus Competition - 09/24/14 A',
    'id':5,
    'series':'Invictus Competition',
    'description':'Three sets of:</br>'+
			'Jerk Balance x 3 reps</br>'+
			'Immediately followed by...</br>'+
			'Every 2 minutes, for 10 minutes (5 sets) of:</br>'+
			'Split Jerk x 3 reps @ 60-70%</br>'+
			'Focus here is on PERFECT mechanics. Pause in the receiving position and check that you are perfectly balanced and your feet are where you want them to be before recovering.',
    'requiredMaxes':['Split Jerk 1RM'],
    'workout': [//This is a series of steps
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Split Jerk',3,.70,0,0,120],
                [9,'Split Jerk',3,.70,0,0,120],
                [9,'Split Jerk',3,.70,0,0,120],
                [9,'Split Jerk',3,.70,0,0,120],
                [9,'Split Jerk',3,.70,0,0,120],
    ]},
    {'date':'09/24/14',
	'title': 'Invictus Competition - 09/24/14 B',
    'id':6,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 8 minutes (4 sets) of:</br>'+
			'Deadlift</br>'+
			'*Set 1 - 8 reps @ 50%</br>'+
			'*Set 2 - 6 reps @ 60%</br>'+
			'*Set 3 - 4 reps @ 70%</br>'+
			'*Set 4 - 2 reps @ 75%',
	'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Deadlift',8,.50,0,0,120],
                [3,'Deadlift',6,.60,0,0,120],
                [3,'Deadlift',4,.70,0,0,120],
                [3,'Deadlift',2,.75,0,0,120],
    ]},
    {'date':'09/24/14',
	'title': 'Invictus Competition - 09/24/14 C',
    'id':7,
    'series':'Invictus Competition',
    'description':'Every 90 seconds for 12 minutes (8 sets):</br>'+
		'Speed Deadlift x 3 reps @ 60%</br>'+
		'Reset the barbell every time on the floor...do not perform these touch and go.',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90],
                [3,'Speed Deadlift',3,.60,0,0,90]
    ]},
      {'date':'09/29/14',
    'title': 'Invictus Competition - 09/29/14 A',
    'id':8,
    'series':'Invictus Competition',
    'description':'Every 30 seconds, for 15 minutes (10 sets of each) perform the following:</br>'+
                        '-Interval 1 (30s) - Drop Snatch x 1 rep</br>'+
                        '-Interval 2 (60s) - High Hang Snatch x 1 rep</br>'+
                        '-Interval 3 (90s) - Snatch x 1 rep</br>'+
                        '-Perform all movements at 70-75% of your 1-RM Snatch. Same as last week, try to increase the load a little bit. If you aren’t confident performing a drop snatch with 70%, modify the movement to a Snatch Balance and allow yourself to dip and drive a bit.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30],
                [2,"Drop Snatch",1,.75,0,0,30],
                [2,"High Hang Snatch",1,.75,0,0,30],
                [2,"Snatch",1,.75,0,0,30]
    ]},
  {'date':'09/29/14',
  'title': 'Invictus Competition - 09/29/14 B',
  'id':9,
    'series':'Invictus Competition',
    'description':'Every two minutes, for 12 minutes (6 sets) of:</br>'+
      'Strict Shoulder Press x 5 reps @ 80-85%',
  'requiredMaxes':['Shoulder Press 1RM'],
    'workout': [//This is a series of steps
                [6,"Strict Shoulder Press",5,.85,0,0,120],
                [6,"Strict Shoulder Press",5,.85,0,0,120],
                [6,"Strict Shoulder Press",5,.85,0,0,120],
                [6,"Strict Shoulder Press",5,.85,0,0,120],
                [6,"Strict Shoulder Press",5,.85,0,0,120],
                [6,"Strict Shoulder Press",5,.85,0,0,120],          
    ]},

    {'date':'10/13/14',
    'title': 'VBC - 10/13/14 - 1',
    'id':10,
    'series':'Venice Barbell Club',
    'description':'Every 90 seconds for 18 minutes(12 sets): 21 Snatch – work up over 12 sets, starting at 55%',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,"21 Snatch",1,.55,0,0,90],
                [2,"21 Snatch",1,.60,0,0,90],
                [2,"21 Snatch",1,.65,0,0,90],
                [2,"21 Snatch",1,.70,0,0,90],
                [2,"21 Snatch",1,.75,0,0,90],
                [2,"21 Snatch",1,.78,0,0,90],
                [2,"21 Snatch",1,.83,0,0,90],
                [2,"21 Snatch",1,.86,0,0,90],
                [2,"21 Snatch",1,.89,0,0,90],
                [2,"21 Snatch",1,.92,0,0,90],
                [2,"21 Snatch",1,.95,0,0,90],
                [2,"21 Snatch",1,1,0,0,90],
                        
    ]},
    {'date':'10/13/14',
    'title': 'VBC - 10/13/14 - 2',
    'id':11,
    'series':'Venice Barbell Club',
    'description':' Back Squat: 4 x 4 @ 85%, 1 x max reps @ 75% – rest 2-3 minutes betweens sets.',
    'requiredMaxes':['Back Squat 1RM'],
    'workout': [//This is a series of steps
                [5,"Back Squat",4,.85,0,180,0],
                [5,"Back Squat",4,.85,0,180,0],
                [5,"Back Squat",4,.85,0,180,0],
                [5,"Back Squat",4,.85,0,180,0],
                [5,"Back Squat",'max',.75,0,0,0],
    ]},
    {'date':'10/13/14',
    'title': 'VBC - 10/13/14 - 3',
    'id':12,
    'series':'Venice Barbell Club',
    'description':' Snatch High Pulls: 4 x 5 . 80-90% max snatch, focusing on complete extension',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,"Snatch High Pull",5,.90,0,120,0],
                [2,"Snatch High Pull",5,.90,0,120,0],
                [2,"Snatch High Pull",5,.90,0,120,0],
                [2,"Snatch High Pull",5,.90,0,120,0],
    ]},
    {'date':'10/13/14',
    'title': 'Test Clean Ladder',
    'id':13,
    'series':'Other',
    'description':'6 Test cleans</br>'+
        '*3 Cleans at 60% every 30 seconds</br>'+
        '*3 Cleans 70% with 30 seconds of rest after each',
    'requiredMaxes':['Clean 1RM'],
    'workout': [//This is a series of steps
                [1,"Clean",1,.60,0,0,30],
                [1,"Clean",1,.60,0,0,30],
                [1,"Clean",1,.60,0,0,30],
                [1,"Clean",1,.70,0,30,0],
                [1,"Clean",1,.70,0,30,0],
                [1,"Clean",1,.70,0,30,0],
    ]},
    {'date':'09/30/14',
  'title': 'Invictus Competition - 09/30/14 A',
  'id':14,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 20 minutes (10 sets) of:</br>'+
                'Power Clean + Hang Clean + High Hang Clean</br>'+
                '*Sets 1-3 – 60-65%</br>'+
                '*Sets 4-6 – 65-70%</br>'+
                '*Sets 7-8 – 70-75%</br>'+
                '*Sets 9-10 – 75-80%',
  'requiredMaxes':['Power Clean 1RM'],
    'workout': [//This is a series of steps
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.65,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.65,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.65,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.70,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.70,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.70,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.75,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.75,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.80,0,0,120],
                [1,['Power Clean','Hang Clean','High Hang Clean'],3,.80,0,0,120],
                      
    ]},
    {'date':'09/30/14',
    'title': 'Invictus Competition - 09/30/14 B',
    'id':15,
    'series':'Invictus Competition',
    'description':'Five sets of:</br>'+
        'Front Squat x 4-5 reps @ 41X1</br>'+
        '(MUST move up in weight from last week by 4-6%)</br>'+
        'Rest 3 minutes</br>',
    'requiredMaxes':['Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,'Front Squat',5,.75,0,180,0],
                [5,'Front Squat',5,.75,0,180,0],
                [5,'Front Squat',5,.75,0,180,0],
                [5,'Front Squat',5,.75,0,180,0],
                [5,'Front Squat',5,.75,0,0,0]
    ]},
    {'date':'10/01/14',
    'title': 'Invictus Competition - 10/01/14 A',
    'id':16,
    'series':'Invictus Competition',
    'description':'Three sets of:</br>'+
            'Jerk Balance x 3 reps</br>'+
            'Immediately followed by...</br>'+
            'Every 2 minutes, for 10 minutes (5 sets) of:</br>'+
            'Split Jerk x 3 reps @ 65-75%</br>'+
            'Focus here is on PERFECT mechanics. Pause in the receiving position and check that you are perfectly balanced and your feet are where you want them to be before recovering.',
    'requiredMaxes':['Split Jerk 1RM'],
    'workout': [//This is a series of steps
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Split Jerk',3,.75,0,0,120],
                [9,'Split Jerk',3,.75,0,0,120],
                [9,'Split Jerk',3,.75,0,0,120],
                [9,'Split Jerk',3,.75,0,0,120],
                [9,'Split Jerk',3,.75,0,0,120],
    ]},
    {'date':'10/01/14',
    'title': 'Invictus Competition - 10/01/14 B',
    'id':17,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 8 minutes (4 sets) of:</br>'+
            'Deadlift</br>'+
            '*Set 1 - 8 reps @ 50%</br>'+
            '*Set 2 - 6 reps @ 60%</br>'+
            '*Set 3 - 4 reps @ 70%</br>'+
            '*Set 4 - 2 reps @ 80%',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Deadlift',8,.50,0,0,120],
                [3,'Deadlift',6,.60,0,0,120],
                [3,'Deadlift',4,.70,0,0,120],
                [3,'Deadlift',2,.80,0,0,120],
    ]},
    {'date':'10/01/14',
    'title': 'Invictus Competition - 10/01/14 C',
    'id':18,
    'series':'Invictus Competition',
    'description':'Every 90 seconds for 12 minutes (8 sets):</br>'+
        'Speed Deadlift x 3 reps @ 60%</br>'+
        'Reset the barbell every time on the floor...do not perform these touch and go.',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90],
                [3,'Speed Deadlift',3,.65,0,0,90]
    ]},

    {'date':'10/03/14',
    'title': 'Invictus Competition - 10/03/14 A',
    'id':19,
    'series':'Invictus Competition',
    'description':'Every 90 seconds, for 15 minutes (10 sets):</br>'+
                'Snatch x 1 rep</br>'+
                'Build by feel. Load should be secondary to perfect mechanics. If the rep isn’t technically perfect, do not add load.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90]
    ]},
    {'date':'10/03/14',
    'title': 'Invictus Competition - 10/03/14 B',
    'id':20,
    'series':'Invictus Competition',
    'description':'Every minute, on the minute, for 12 minutes:</br>'+
            'Front Squat + Jerk</br>'+
            '*Sets 1-2 – 60%</br>'+
            '*Sets 3-4 – 70%</br>'+
            '*Sets 5-6 – 75%</br>'+
            '*Sets 7-8 – 80%</br>'+
            '*Sets 9-10 – 85%</br>'+
            '*Sets 11-12 – 90%</br>'+
            'Percentages based off whichever of the two movements limit you – in other words, if you jerk more than you Front Squat, base the percentages off of your front squat.',
    'requiredMaxes':['Jerk or Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,['Front Squat','Jerk'],2,.60,0,0,60],
                [5,['Front Squat','Jerk'],2,.60,0,0,60],
                [5,['Front Squat','Jerk'],2,.70,0,0,60],
                [5,['Front Squat','Jerk'],2,.70,0,0,60],
                [5,['Front Squat','Jerk'],2,.75,0,0,60],
                [5,['Front Squat','Jerk'],2,.75,0,0,60],
                [5,['Front Squat','Jerk'],2,.80,0,0,60],
                [5,['Front Squat','Jerk'],2,.80,0,0,60],
                [5,['Front Squat','Jerk'],2,.85,0,0,60],
                [5,['Front Squat','Jerk'],2,.85,0,0,60],
                [5,['Front Squat','Jerk'],2,.90,0,0,60],
                [5,['Front Squat','Jerk'],2,.90,0,0,60]
    ]},
    {'date':'10/04/14',
    'title': 'Invictus Competition - 10/04/14 A',
    'id':21,
    'series':'Invictus Competition',
    'description':'Every two minutes, for 10 minutes (5 sets):</br>'+
        'Back Squat</br>'+
        '*Set 1 – 5 reps @ 55%</br>'+
        '*Set 2 – 5 reps @ 65%</br>'+
        '*Set 3 – 3 reps @ 75%</br>'+
        '*Set 4 – 2 reps @ 85%</br>'+
        '*Set 5 – 2 reps @ 90%</br>'+
        'Immediately followed by…</br>'+
        'Every two minutes, for 6 minutes (3 sets):</br>'+
        'Back Squat x 10 reps @ 78%',
    'requiredMaxes':['Back Squat 1RM'],
    'workout': [//This is a series of steps
                [5,'Back Squat',5,.55,0,0,120],
                [5,'Back Squat',5,.65,0,0,120],
                [5,'Back Squat',3,.75,0,0,120],
                [5,'Back Squat',2,.85,0,0,120],
                [5,'Back Squat',2,.90,0,0,120],
                [5,'Back Squat',10,.78,0,0,120],
                [5,'Back Squat',10,.78,0,0,120],
                [5,'Back Squat',10,.78,0,0,120]
    ]},
    {'date':'10/06/14',
    'title': 'Invictus Competition - 10/06/14 A',
    'id':22,
    'series':'Invictus Competition',
    'description':'Every 45 seconds, for 18 minutes (8 sets of each) perform the following:</br>'+
                        '-Interval 1 (45s) - Snatch Balance x 1 rep</br>'+
                        '-Interval 2 (90s) - Hang Snatch x 1 rep</br>'+
                        '-Interval 3 (135s) - Snatch x 1 rep</br>'+
                        'Perform all movements at 75-80% of your 1-RM Snatch.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45],
                [2,"Snatch Balance",1,.80,0,0,45],
                [2,"Hang Snatch",1,.80,0,0,45],
                [2,"Snatch",1,.80,0,0,45]
    ]},
    {'date':'10/06/14',
    'title': 'Invictus Competition - 10/06/14 B',
    'id':23,
    'series':'Invictus Competition',
    'description':'Every two minutes, for 12 minutes (6 sets) of:</br>'+
                  'Strict Shoulder Press x 4 reps @ 85-90%',
    'requiredMaxes':['Shoulder Press 1RM'],
    'workout': [//This is a series of steps
                [6,"Strict Shoulder Press",4,.90,0,0,120],
                [6,"Strict Shoulder Press",4,.90,0,0,120],
                [6,"Strict Shoulder Press",4,.90,0,0,120],
                [6,"Strict Shoulder Press",4,.90,0,0,120],
                [6,"Strict Shoulder Press",4,.90,0,0,120],
                [6,"Strict Shoulder Press",4,.90,0,0,120]
    ]},
    {'date':'10/07/14',
    'title': 'Invictus Competition - 10/07/14 A',
    'id':24,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 20 minutes (10 sets) of:</br>'+
                    'Clean + Hang Clean</br>'+
                    '*Sets 1-3 – 65-70%</br>'+
                    '*Sets 4-6 – 70-75%</br>'+
                    '*Sets 7-8 – 75-80%</br>'+
                    '*Sets 9-10 – 80-85%',
    'requiredMaxes':['Clean 1RM'],      
    'workout': [//This is a series of steps
                [1,['Clean','Hang Clean'],2,.70,0,0,120],
                [1,['Clean','Hang Clean'],2,.70,0,0,120],
                [1,['Clean','Hang Clean'],2,.70,0,0,120],
                [1,['Clean','Hang Clean'],2,.75,0,0,120],
                [1,['Clean','Hang Clean'],2,.75,0,0,120],
                [1,['Clean','Hang Clean'],2,.75,0,0,120],
                [1,['Clean','Hang Clean'],2,.80,0,0,120],
                [1,['Clean','Hang Clean'],2,.80,0,0,120],
                [1,['Clean','Hang Clean'],2,.85,0,0,120],
                [1,['Clean','Hang Clean'],2,.85,0,0,120],
                
    ]},
    {'date':'10/07/14',
    'title': 'Invictus Competition - 10/07/14 B',
    'id':25,
    'series':'Invictus Competition',
    'description':'Five sets of:</br>'+
        'Front Squat x 3-4 reps @ 4111</br>'+
        '(MUST move up in weight from last week by 4-6%)</br>'+
        'Rest 3 minutes',
    'requiredMaxes':['Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,'Front Squat',4,.80,0,180,0],
                [5,'Front Squat',6,.80,0,180,0],
                [5,'Front Squat',6,.80,0,180,0],
                [5,'Front Squat',6,.80,0,180,0],
                [5,'Front Squat',6,.80,0,0,0]
    ]},
    {'date':'10/08/14',
    'title': 'Invictus Competition - 10/08/14 A',
    'id':26,
    'series':'Invictus Competition',
    'description':'Three sets of:</br>'+
            'Jerk Balance x 3 reps</br>'+
            'Immediately followed by...</br>'+
            'Every 2 minutes, for 10 minutes (5 sets) of:</br>'+
            'Split Jerk x 3 reps @ 70-80%</br>'+
            'Focus here is on PERFECT mechanics. Pause in the receiving position and check that you are perfectly balanced and your feet are where you want them to be before recovering.',
    'requiredMaxes':['Split Jerk 1RM'],
    'workout': [//This is a series of steps
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Jerk Balance',3,0,0,0,0],
                [9,'Split Jerk',3,.80,0,0,120],
                [9,'Split Jerk',3,.80,0,0,120],
                [9,'Split Jerk',3,.80,0,0,120],
                [9,'Split Jerk',3,.80,0,0,120],
                [9,'Split Jerk',3,.80,0,0,120],
    ]},
    {'date':'10/08/14',
    'title': 'Invictus Competition - 10/08/14 B',
    'id':27,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 10 minutes (5 sets) of:</br>'+
            'Deadlift</br>'+
            '*Set 1 - 8 reps @ 50%</br>'+
            '*Set 2 - 6 reps @ 60%</br>'+
            '*Set 3 - 4 reps @ 70%</br>'+
            '*Set 4 - 2 reps @ 80%</br>'+
            '*Set 5 - 2 reps @ 85%',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Deadlift',8,.50,0,0,120],
                [3,'Deadlift',6,.60,0,0,120],
                [3,'Deadlift',4,.70,0,0,120],
                [3,'Deadlift',2,.80,0,0,120],
                [3,'Deadlift',2,.85,0,0,120],
    ]},
    {'date':'10/08/14',
    'title': 'Invictus Competition - 10/08/14 C',
    'id':28,
    'series':'Invictus Competition',
    'description':'Every 90 seconds for 9 minutes (6 sets):</br>'+
        'Speed Deadlift x 3 reps @ 70%</br>'+
        'Reset the barbell every time on the floor…do not perform these touch and go.',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Speed Deadlift',3,.70,0,0,90],
                [3,'Speed Deadlift',3,.70,0,0,90],
                [3,'Speed Deadlift',3,.70,0,0,90],
                [3,'Speed Deadlift',3,.70,0,0,90],
                [3,'Speed Deadlift',3,.70,0,0,90],
                [3,'Speed Deadlift',3,.70,0,0,90]
    ]},
    {'date':'10/10/14',
    'title': 'Invictus Competition - 10/10/14 A',
    'id':29,
    'series':'Invictus Competition',
    'description':'Every 90 seconds, for 15 minutes (10 sets):</br>'+
                'Snatch x 1 rep</br>'+
                'Build by feel. Load should be secondary to perfect mechanics. If the rep isn’t technically perfect, do not add load.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90]
    ]},
    {'date':'10/10/14',
    'title': 'Invictus Competition - 10/10/14 B',
    'id':30,
    'series':'Invictus Competition',
    'description':'Every 90 seconds, for 15 minutes:</br>'+
            'Front Squat + Jerk</br>'+
            '*Sets 1-2 – 65%</br>'+
            '*Sets 3-4 – 75%</br>'+
            '*Sets 5-6 – 80-85%</br>'+
            '*Sets 7-8 – 85-90%</br>'+
            '*Sets 9-10 – 90-95%',
    'requiredMaxes':['Jerk or Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,['Front Squat','Jerk'],2,.65,0,0,90],
                [5,['Front Squat','Jerk'],2,.65,0,0,90],
                [5,['Front Squat','Jerk'],2,.75,0,0,90],
                [5,['Front Squat','Jerk'],2,.75,0,0,90],
                [5,['Front Squat','Jerk'],2,.85,0,0,90],
                [5,['Front Squat','Jerk'],2,.85,0,0,90],
                [5,['Front Squat','Jerk'],2,.90,0,0,90],
                [5,['Front Squat','Jerk'],2,.90,0,0,90],
                [5,['Front Squat','Jerk'],2,.95,0,0,90],
                [5,['Front Squat','Jerk'],2,.95,0,0,90]
    ]},
    {'date':'10/11/14',
    'title': 'Invictus Competition - 10/11/14 A',
    'id':31,
    'series':'Invictus Competition',
    'description':'Every two minutes, for 10 minutes (5 sets):</br>'+
        'Back Squat</br>'+
        '*Set 1 – 5 reps @ 55%</br>'+
        '*Set 2 – 5 reps @ 65%</br>'+
        '*Set 3 – 3 reps @ 75%</br>'+
        '*Set 4 – 2 reps @ 85%</br>'+
        '*Set 5 – 2 reps @ 90%</br>'+
        'Every two minutes, for 6 minutes (3 sets):</br>'+
        'Back Squat x 10 reps @ 80%',
    'requiredMaxes':['Back Squat 1RM'],
    'workout': [//This is a series of steps
                [5,'Back Squat',5,.55,0,0,120],
                [5,'Back Squat',5,.65,0,0,120],
                [5,'Back Squat',3,.75,0,0,120],
                [5,'Back Squat',2,.85,0,0,120],
                [5,'Back Squat',2,.90,0,0,120],
                [5,'Back Squat',10,.80,0,0,120],
                [5,'Back Squat',10,.80,0,0,120],
                [5,'Back Squat',10,.80,0,0,120]
    ]},
    {'date':'10/13/14',
    'title': 'Invictus Competition - 10/13/14 A',
    'id':32,
    'series':'Invictus Competition',
    'description':'Every minute, on the minute, for 21 minutes (7 sets of each) perform the following:</br>'+
                        '-Minute 1  - Snatch Balance x 1 rep</br>'+
                        '-Minute 2  - Hang Snatch x 1 rep</br>'+
                        '-Minute 3  - Snatch x 1 rep</br>'+
                        'Perform all movements at 80-85% of your 1-RM Snatch.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60],
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60],
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60],
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60],
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60],
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60],
                [2,"Snatch Balance",1,.85,0,0,60],
                [2,"Hang Snatch",1,.85,0,0,60],
                [2,"Snatch",1,.85,0,0,60]
    ]},
    {'date':'10/13/14',
    'title': 'Invictus Competition - 10/13/14 B',
    'id':33,
    'series':'Invictus Competition',
    'description':'Every two minutes, for 12 minutes (6 sets) of:</br>'+
                  'Strict Shoulder Press x 3 reps @ 88-92%</br>'+
                  '(remember, these numbers should be based off of your tested 1-RM on September 22…not a number that you hit or dreamed of hitting many moons ago)',
    'requiredMaxes':['Shoulder Press 1RM'],
    'workout': [//This is a series of steps
                [6,"Strict Shoulder Press",3,.92,0,0,120],
                [6,"Strict Shoulder Press",3,.92,0,0,120],
                [6,"Strict Shoulder Press",3,.92,0,0,120],
                [6,"Strict Shoulder Press",3,.92,0,0,120],
                [6,"Strict Shoulder Press",3,.92,0,0,120],
                [6,"Strict Shoulder Press",3,.92,0,0,120]
    ]},
    {'date':'10/14/14',
    'title': 'Invictus Competition - 10/14/14 A',
    'id':34,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 20 minutes (10 sets) of:</br>'+
                    'Hang Clean + Clean</br>'+
                    '*Sets 1-3 – 65-70%</br>'+
                    '*Sets 4-6 – 70-75%</br>'+
                    '*Sets 7-8 – 75-80%</br>'+
                    '*Sets 9-10 – 80-85%',
    'requiredMaxes':['Clean 1RM'],      
    'workout': [//This is a series of steps
                [1,['Hang Clean','Clean'],2,.70,0,0,120],
                [1,['Hang Clean','Clean'],2,.70,0,0,120],
                [1,['Hang Clean','Clean'],2,.70,0,0,120],
                [1,['Hang Clean','Clean'],2,.75,0,0,120],
                [1,['Hang Clean','Clean'],2,.75,0,0,120],
                [1,['Hang Clean','Clean'],2,.75,0,0,120],
                [1,['Hang Clean','Clean'],2,.80,0,0,120],
                [1,['Hang Clean','Clean'],2,.80,0,0,120],
                [1,['Hang Clean','Clean'],2,.85,0,0,120],
                [1,['Hang Clean','Clean'],2,.85,0,0,120],
                
    ]},
    {'date':'10/14/14',
    'title': 'Invictus Competition - 10/14/14 B',
    'id':35,
    'series':'Invictus Competition',
    'description':'Front Squat</br>'+
        '(no prescribed tempo this week)</br>'+
        '*Set 1 – 4 reps @ 75-80%</br>'+
        '*Set 2 – 3 reps @ 80-85%</br>'+
        '*Set 3 – 2 reps @ 85-90%</br>'+
        '*Set 4 – 4 reps @ 80-85%</br>'+
        '*Set 5 – 3 reps @ 85-90%</br>'+
        '*Set 6 – 2 reps @ 90-95%</br>'+
        '*Set 7 – 6 reps @ 75-80%</br>'+
        'Rest 2 minutes between sets',
    'requiredMaxes':['Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,'Front Squat',4,.80,0,120,0],
                [5,'Front Squat',3,.85,0,120,0],
                [5,'Front Squat',2,.90,0,120,0],
                [5,'Front Squat',4,.85,0,120,0],
                [5,'Front Squat',3,.90,0,120,0],
                [5,'Front Squat',2,.95,0,120,0],
                [5,'Front Squat',6,.80,0,120,0],
                
    ]},
    {'date':'10/15/14',
    'title': 'Invictus Competition - 10/15/14 A',
    'id':36,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 20 minutes (10 sets):</br>'+
        'Split Jerk</br>'+
        '*Sets 1-2 – 3 reps @ 60%</br>'+
        '*Sets 3-4 – 2 reps @ 70%</br>'+
        '*Sets 5-6 – 2 reps @ 80%</br>'+
        '*Sets 7-8 – 1 rep @ 85-90%</br>'+
        '*Sets 9-10 – 1 rep @ 90-95%',
    'requiredMaxes':['Split Jerk 1RM'],
    'workout': [//This is a series of steps
                [9,'Split Jerk',3,.60,0,0,120],
                [9,'Split Jerk',3,.60,0,0,120],
                [9,'Split Jerk',2,.70,0,0,120],
                [9,'Split Jerk',2,.70,0,0,120],
                [9,'Split Jerk',2,.80,0,0,120],
                [9,'Split Jerk',2,.80,0,0,120],
                [9,'Split Jerk',1,.90,0,0,120],
                [9,'Split Jerk',1,.90,0,0,120],
                [9,'Split Jerk',1,.95,0,0,120],
                [9,'Split Jerk',1,.95,0,0,120],
    ]},
    {'date':'10/15/14',
    'title': 'Invictus Competition - 10/15/14 B',
    'id':37,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 10 minutes (5 sets) of:</br>'+
            'Deadlift</br>'+
            '*Set 1 - 8 reps @ 50%</br>'+
            '*Set 2 - 6 reps @ 60%</br>'+
            '*Set 3 - 4 reps @ 70%</br>'+
            '*Set 4 - 2 reps @ 80%</br>'+
            '*Set 5 - 2 reps @ 90%',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Deadlift',8,.50,0,0,120],
                [3,'Deadlift',6,.60,0,0,120],
                [3,'Deadlift',4,.70,0,0,120],
                [3,'Deadlift',2,.80,0,0,120],
                [3,'Deadlift',2,.90,0,0,120],
    ]},
    {'date':'10/15/14',
    'title': 'Invictus Competition - 10/15/14 C',
    'id':38,
    'series':'Invictus Competition',
    'description':'Every 90 seconds for 9 minutes (6 sets):</br>'+
        'Speed Deadlift x 3 reps @ 75%</br>'+
        'Reset the barbell every time on the floor…do not perform these touch and go.',
    'requiredMaxes':['Deadlift 1RM'],
    'workout': [//This is a series of steps
                [3,'Speed Deadlift',3,.75,0,0,90],
                [3,'Speed Deadlift',3,.75,0,0,90],
                [3,'Speed Deadlift',3,.75,0,0,90],
                [3,'Speed Deadlift',3,.75,0,0,90],
                [3,'Speed Deadlift',3,.75,0,0,90],
                [3,'Speed Deadlift',3,.75,0,0,90]
    ]},
    {'date':'10/17/14',
    'title': 'Invictus Competition - 10/17/14 A',
    'id':39,
    'series':'Invictus Competition',
    'description':'Every 90 seconds, for 15 minutes (10 sets):</br>'+
                'Snatch x 1 rep</br>'+
                'Build by feel. Load should be secondary to perfect mechanics. If the rep isn’t technically perfect, do not add load.',
    'requiredMaxes':['Snatch 1RM'],
    'workout': [//This is a series of steps
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90],
                [2,'Snatch',1,0,0,0,90]
    ]},
    {'date':'10/17/14',
    'title': 'Invictus Competition - 10/17/14 B',
    'id':40,
    'series':'Invictus Competition',
    'description':'Every 2 minutes, for 16 minutes (8 sets):</br>'+
            'Front Squat + Jerk</br>'+
            '*Sets 1-2 – 70-75%</br>'+
            '*Sets 3-4 – 80-85%</br>'+
            '*Sets 5-6 – 90-95%</br>'+
            '*Sets 7-8 – 95+%',
    'requiredMaxes':['Jerk or Front Squat 1RM'],
    'workout': [//This is a series of steps
                [5,['Front Squat','Jerk'],2,.75,0,0,90],
                [5,['Front Squat','Jerk'],2,.75,0,0,90],
                [5,['Front Squat','Jerk'],2,.85,0,0,90],
                [5,['Front Squat','Jerk'],2,.85,0,0,90],
                [5,['Front Squat','Jerk'],2,.95,0,0,90],
                [5,['Front Squat','Jerk'],2,.95,0,0,90],
                [5,['Front Squat','Jerk'],2,1.00,0,0,90],
                [5,['Front Squat','Jerk'],2,1.00,0,0,90],
    ]},
];