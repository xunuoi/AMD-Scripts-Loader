define('c',['e'], function (e) {
    //alert('c define function has runed');
    return {
        'hello': function(){
            alert('hello, i am mod c');
            console.log(e);
        },
        getE: function(){
        	return e;
        }
    }
});