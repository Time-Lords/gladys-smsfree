
module.exports = {
    
    folderName: 'smsfree',
    // Inject Boxs in dashboard
    // dashboadBoxs is an array of dashboardBox 
    dashboardBoxs: [{
        title: 'Sms Free Mobile',
        // the name of your Angular Controller for this box (put an empty string if you don't use angular)
        ngController: 'smsfreeController as vm',
        file : 'box.ejs',
        icon: 'fa fa-mobile',
        type: 'box-primary'
    }],
    // link assets to project
    linkAssets: true
};