    window.require_bak = function(){
        
        var _srcLogs = [];
        var basePath = './lib/';

        var _require = function(moduleName, fn){
            var loadedScripts = document.getElementsByTagName('script');
            var sLen = loadedScripts.length;
            for(var sI=0; sI<sLen; sI++ ){
                _srcLogs.push(loadedScripts[sI].getAttribute('src'));
            }
            //console.log(_srcLogs);
            
            if(stone.inArray(stone.classOf(moduleName), ['String', 'Array'])) {
                var modName = [].concat(moduleName);

            }else {
                stone.throwError('TyperError', 'moduleName Expected be String or Array, but got '+stone.classOf(moduleName));
            }

            _require.domScriptLoad(modName, fn);

        };///var _require
        // COMMON FUNCTION 
        _require.require = _require;

        _require.domScriptLoad = function(modName, fn){
            var curModName = modName.shift();//获取第一个

            shortName = stone.getShortName(curModName, 'js');
            fullName = stone.getFullName(curModName, 'js');

            var _srcPath = basePath + fullName;     
            //防止重复载入,如果已经再如果一遍了，那么跳过后直接进行下一次载入
            if(stone.inArray(_srcPath, _srcLogs) ) {
                typeof fn == 'function' ? fn() : '';
                if(modName.length > 0){
                    arguments.callee(modName);
                }
                else {
                    return true;
                }
            }
            //开始载入
            stone.getScript(_srcPath, function(){
                //存入档案
                _srcLogs.push(_srcPath);
                //如果没有全部载入完毕，那么继续递归依次载入(不可用arguments.callee！！！)
                if(modName.length > 0) { _require.domScriptLoad(modName, fn) }
                //如果全部载入完毕，检查是否可以启动stack
                else {
                    typeof fn == 'function' ? fn() : '';
                }
            });///END: Stone.getScript  

        };

        _require.setPath = function(path){
            stone.typeCheck(path, 'string');
            basePath = path;
            return this;
        };

        // config require
        var _ifOrder = true;

        _require.order = function(){
            if(arguments.length){
                return _ifOrder = true, this.apply(this, arguments);//利用this.apply传递arguments参数
            } else {
                return _ifOrder = true, this;
            }
        };
        _require.go = function(){
            if(arguments.length){
                return _ifOrder = false, this.apply(this, arguments);
            } else {
                return _ifOrder = false, this;
            }
        };
        //设定载入路径
        _require.path = function(path){
            stone.typeCheck(path, 'string');
            this.setPath(path);
            return this;
        };

        //?????? NOT FINISHED 
        _require.async = function(){
            //load by ajax in async
        };
        _require.sync = function(){
            //load by ajax in sync
        };

        return _require;

    }();///window.require