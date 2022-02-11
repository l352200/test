module.exports={
    productionSourceMap:false,
    // lintOnsave:false,
    devServer:{
        proxy:{
            "/api":{
                target:"https//39.98.123.211"
            }
        }
    }
}