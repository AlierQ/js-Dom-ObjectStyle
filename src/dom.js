window.dom = {
    // 创捷节点
    create(htmlString){
        const container = document.createElement('template');
        container.innerHTML = htmlString.trim();
        return container.content.firstChild;
    },
    // 在节点之后添加节点
    after(node,insertNode){
        // 调用当前元素的父元素的insertBefore方法将元素插在当前元素的后一个之前
        // 即在他后方插入一个
        node.parentNode.insertBefore(insertNode,node.nextSibling)
    },
    // 在节点之前添加节点
    before(node,insertNode){
        node.parentNode.insertBefore(insertNode,node)
    },
    // 在当前节点的最后添加一个子节点
    append(parentNode,childNode){
        parentNode.appendChild(childNode)
    },
    // 为当前节点添加一个父节点
    wrap(node,parentNode){
        dom.before(node,parentNode)
        // parentNode.appendChild(node)
        dom.append(parentNode,node)
    },
    // 删除当前节点
    remove(node){
        // tip：可以考虑是否保留当前节点中的元素
        // console.log(arguments[0],arguments[1]);
        node.parentNode.removeChild(node);
        return node;
    },
    // 清空节点后代节点
    empty(node){
        const childArray = [];
        // 方式一：
        // const childNodes  = node.children;
        // for(let i = 0;;){
        //     if(childNodes[i]===undefined){
        //         break;
        //     }
        //     childArray.push(childNodes[i])
        //     dom.remove(childNodes[i]);
        // }

        // 方式二：
        let first = node.firstChild 
        while(first){
            childArray.push(dom.remove(first));
            first = node.firstChild;
        }
        return childArray;
    },
    // 修改指定节点的指定元素
    attr(node,key,value){
        if(arguments.length === 2){ // 不穿value就获取属性值
            return node.getAttribute(key)
        }else{ // 传递value就设置属性值
            node.setAttribute(key,value);
        }
    },
    // 读写节点中的文本内容
    text(node,text){
        // 没有传值就获取text
        if(arguments.length === 1){
            return 'innerText' in node ? node.innerText : node.textContent;
        }else{
            // 判断当前节点中有没有innerText属性
            'innerText' in node ? node.innerText = text : node.textContent = text;
        }
    },
    // 读写节点中的html内容
    html(node, htmlText){
        if(arguments.length === 1){
            return node.innerHTML;
        }else{
            node.innerHTML = htmlText;
        }
    },
    // 读写节点的style
    style(node, name, value){
        if(arguments.length === 3){
            // dom.style(node,'background',value)
            node.style[name] = value;
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                // dom.style(node,'background')
                return node.style[name]
            }else if(name instanceof Object){
                for(let key in name){
                    // style.[key] 使用变量key的值
                    // dom.style(node,{background:'red',color:'green'})
                    node.style[key] = name[key];
                }
            }
        }
    },
    class:{
        // 给节点追加样式
        add(node,className){
            node.classList.add(className);
        },
        // 删除节点样式
        remove(node,className){
            node.classList.remove(className);
        },
        // 查找是否存在样式
        has(node,className){
            return node.classList.contains(className);
        }
    },
    // 添加监听
    on(node, eventClass, fn){
        node.addEventListener(eventClass,fn);
    },
    // 移除监听
    off(node, eventClass, fn){
        node.removeEventListener(eventClass,fn);
    },
    find(selector,node){
        // 指定查找范围
        // if(arguments.length === 2){
        //     return node.querySelectorAll(selector);
        // }else if(arguments.length === 1){ // 未指定查找范围
        //     return document.querySelectorAll(selector);
        // }
        
        // 短路或运算,如果node有值就使用node，否则就使用document，查找第一个为真的，找不到就返回最后一个表达式
        return (node || document).querySelectorAll(selector);
    },
    // 获取节点的父亲
    parent(node){
        return node.parentNode;
    },
    // 获取节点的孩子
    children(node){
        return node.children;
    },
    // 获取兄弟姐妹
    siblings(node){
        // 使用from变成数组，然后进行过滤
        return Array.from(node.parentNode.children).filter(n => n!==node)
    },
    // 获取下一个节点
    next(node){
        return node.nextElementSibling;
    },
    // 获取上一个节点
    previous(node){
        return node.previousElementSibling;
    },
    // 遍历
    each(nodes,fn){
        // Array.from(nodes).forEach(fn);
        for(let i = 0; i < nodes.length; i++){
            // 使用数组元素调用fn,this为传入的每个节点
            fn.call(nodes[i],nodes[i]);
        }
    },
    index(node){
        // 获取他父亲的儿子列表
        const childrens = dom.children(dom.parent(node));
        for(let i = 0;i < childrens.length; i++){
            if(childrens[i]===node){
                return i+1;
            }
        }
    }
};