'use strict';

function installLauncherType(launcher, cb){
 	LauncherType.find({code: launcher.code})
		.exec(function(err, launchers){
			if(err) return cb(err);

			if(launchers.length === 0){
				return LauncherType.create(launcher, cb);
			}else{
				return LauncherType.update({id:launchers[0].id}, launcher, cb);
			}
		});
}

function installActionType(action, cb){
 	ActionType.find(action)
		.exec(function(err, actions){
			if(err) return cb(err);

			if(actions.length === 0){
				return ActionType.create(action, cb);
			}else{
				return ActionType.update({id:actions[0].id}, action, cb);
			}
			
		});
}


module.exports = {

	launcherType: function(launchers, callback){
		async.each(launchers, installLauncherType, callback);
	},

	actionType: function(actions, callback){
		async.each(actions, installActionType, callback);
	}

};