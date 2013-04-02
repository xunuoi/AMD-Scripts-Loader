define(/*'b',*/ ['c'], function (c) {
    //alert('b define function has runed');
    return {
        'hello': function(){
            alert('hello, i am mod b');
        },
        getC: function(){
        	return c;
        }
    }
});