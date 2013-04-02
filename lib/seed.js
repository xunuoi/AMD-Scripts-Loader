require(['a', 'w'], function(a, w){
    console.log(arguments);
    w.hello();
    a.getB().hello();
});