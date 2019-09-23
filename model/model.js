var G = {};
var app = function (req,res) {
    if(G['login']){
        G['login'](req,res)
    }
};
app.get = function (string,callback) {
    G[string] = callback

}

app.get('login',function (req,res) {
    console.log('login')
});
app('req','res')