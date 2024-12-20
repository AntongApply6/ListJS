var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("src/view/draggable-button", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.draggableButton = draggableButton;
    function draggableButton({ onDblClick, onContextMenuClick, onClick } = {}) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        .assistive-touch-wrapper {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            z-index: 9999;
            user-select: none;
        }
        .assistive-touch {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: rgb(0 112 255 / 57%); /* 半透明蓝色 */
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
            z-index: 10000;
        }
        .assistive-touch:hover {
            transform: scale(1.1);
        }
        .assistive-touch::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.9); /* 半透明白色 */
            transform: translate(-50%, -50%);
        }
    `;
        document.head.appendChild(style);
        const size = 70;
        const button = document.createElement('div');
        button.style.width = `${size}px`;
        button.style.height = `${size}px`;
        button.className = 'assistive-touch-wrapper';
        const buttonChildren = document.createElement('div');
        buttonChildren.className = 'assistive-touch';
        button.appendChild(buttonChildren);
        document.body.appendChild(button);
        button.ondblclick = (e) => {
            onDblClick && onDblClick(e);
            wrapper.style.display = 'none';
        };
        button.oncontextmenu = (e) => {
            e.preventDefault();
            onContextMenuClick && onContextMenuClick(e);
            wrapper.style.display = 'none';
        };
        const wrapper = document.createElement('div');
        wrapper.setAttribute('style', 'display:none;width:100%;height:100%;z-index:9998;position:absolute;top:0;left:0;');
        document.body.appendChild(wrapper);
        let isDragging = false;
        let initialX, initialY, offsetX, offsetY;
        button.addEventListener('mousedown', (e) => {
            isDragging = true;
            wrapper.style.display = 'block';
            initialX = button.offsetLeft;
            initialY = button.offsetTop;
            offsetX = e.clientX - initialX;
            offsetY = e.clientY - initialY;
            onClick && onClick(e);
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging)
                return;
            const width = document.body.clientWidth - size;
            const height = document.body.clientHeight - size;
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            if (x < 0 || x > width) {
                x = x < 0 ? 0 : width;
            }
            if (y < 0 || y > height) {
                y = y < 0 ? 0 : height;
            }
            button.style.transform = `translate(${x - initialX}px, ${y - initialY}px)`;
        });
        function done() {
            if (!isDragging)
                return;
            isDragging = false;
            const matchs = button.style.transform.match(/-?\d+/g);
            if (matchs) {
                initialX = button.offsetLeft + parseInt(matchs[0]);
                initialY = button.offsetTop + parseInt(matchs[1]);
                button.style.left = `${initialX}px`;
                button.style.top = `${initialY}px`;
                button.style.transform = 'none';
                wrapper.style.display = 'none';
            }
        }
        document.addEventListener('mouseup', done);
        button.addEventListener('mouseup', done);
    }
});
define("src/core/dom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.forEachElements = forEachElements;
    exports.eventOnChange = eventOnChange;
    exports.getChildrenFirstInnerTextByClassName = getChildrenFirstInnerTextByClassName;
    function forEachElements(els, fn) {
        for (let i = 0; i < (els !== null && els !== void 0 ? els : []).length; i++) {
            if (fn(els[i], i, els))
                return;
        }
    }
    function eventOnChange(el) {
        if ("createEvent" in document) {
            const evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            el.dispatchEvent(evt);
        }
        else {
            el.fireEvent("onchange");
        }
    }
    function getChildrenFirstInnerTextByClassName({ rootEl, className }) {
        var _a;
        const elementsByClassName = (_a = rootEl.getElementsByClassName(className)) !== null && _a !== void 0 ? _a : [];
        if (elementsByClassName.length > 0) {
            const divChildren = elementsByClassName[0].querySelectorAll("div");
            if (divChildren.length > 1) {
                return divChildren[1].textContent || divChildren[1].innerText;
            }
            else {
                console.error('The "talk-user" element does not have enough div children.');
            }
        }
        else {
            console.error('No elements with class "talk-user" found.');
        }
        return "";
    }
});
define("src/core/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withinContentNumber = withinContentNumber;
    exports.withinContentArrayNumber = withinContentArrayNumber;
    exports.isEmptyArray = isEmptyArray;
    exports.isBlankString = isBlankString;
    exports.formatDate = formatDate;
    exports.genSwtId = genSwtId;
    exports.upobj = upobj;
    exports.unique = unique;
    function withinContentNumber(keyword, content) {
        let index = content.indexOf(keyword);
        let sum = 0;
        while (index > -1) {
            index = content.indexOf(keyword, index + 1);
            sum++;
        }
        return sum;
    }
    function withinContentArrayNumber(keywords, content) {
        let num = 0;
        (keywords !== null && keywords !== void 0 ? keywords : []).forEach((keyword) => {
            num += withinContentNumber(keyword, content);
        });
        return num;
    }
    function isEmptyArray(arr) {
        return !Array.isArray(arr) || arr.length === 0;
    }
    function isBlankString(str) {
        return str === null || str === undefined || str.trim() === '';
    }
    function formatDate(fmt, date = new Date()) {
        if (typeof date !== 'object') {
            date = new Date(date);
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').slice(-RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                const pad = (str) => ('00' + str).slice(-2);
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k].toString() : pad(o[k].toString()));
            }
        }
        return fmt;
    }
    function genSwtId(num = 32) {
        const len = num;
        const chars = "1234567890abcdefhijkmnprstwxyz";
        const maxPos = chars.length;
        let pwd = "";
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    function upobj(o, keyPath, newValue) {
        function recursiveUpdate(obj, keyPath, newValue) {
            if (keyPath.length === 0) {
                return obj;
            }
            const [currentKey, ...restKeys] = keyPath;
            if (Array.isArray(obj)) {
                return obj.map(item => recursiveUpdate(item, keyPath, newValue));
            }
            else if (typeof obj === 'object' && obj !== null) {
                if (restKeys.length === 0) {
                    return Object.assign(Object.assign({}, obj), { [currentKey]: newValue });
                }
                else {
                    return Object.assign(Object.assign({}, obj), { [currentKey]: recursiveUpdate(obj[currentKey], restKeys, newValue) });
                }
            }
            return obj;
        }
        return recursiveUpdate(o, keyPath.split('.'), newValue);
    }
    function unique(arr) {
        return arr.filter(function (item, index) {
            return arr.indexOf(item) === index;
        });
    }
});
define("src/core/match/keywords", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultKeywordPrefixList = void 0;
    exports.matchKeywordsByContent = matchKeywordsByContent;
    exports.defaultKeywordPrefixList = ["搜索词："];
    function matchKeywordsByContent({ content, keywordPrefixList = exports.defaultKeywordPrefixList }) {
        let message = "";
        if (content) {
            for (let i = 0; i < keywordPrefixList.length; i++) {
                const _k = keywordPrefixList[i];
                const ind = content.indexOf(_k);
                if (ind != -1) {
                    message = content.slice(ind + (_k.length), content.indexOf("<br>", ind));
                    break;
                }
            }
        }
        message = message.replace(/<[^>]+>/g, '').replace(/[ ]|[&nbsp;]/g, '');
        return message;
    }
});
define("src/core/match/source-type", ["require", "exports", "src/core/utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultSourceTypeList = void 0;
    exports.matchSourceTypeByContent = matchSourceTypeByContent;
    exports.defaultSourceTypeList = [
        {
            keywords: ["百度搜索推广"],
            value: "百度竞价"
        }
    ];
    function matchSourceTypeByContent({ content, sourceTypeList = exports.defaultSourceTypeList }) {
        if ((0, utils_1.isBlankString)(content)) {
            return null;
        }
        let result;
        (sourceTypeList !== null && sourceTypeList !== void 0 ? sourceTypeList : []).forEach(source => {
            var _a;
            let num = 0;
            ((_a = source.keywords) !== null && _a !== void 0 ? _a : []).forEach((keyword) => {
                num += (0, utils_1.withinContentNumber)(keyword, content);
            });
            if (result) {
                if (num >= result.count) {
                    result = Object.assign(Object.assign({}, result), { count: num });
                }
            }
            else {
                result = Object.assign(Object.assign({}, source), { count: num });
            }
        });
        return result;
    }
});
define("src/core/match/real-name", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultFirstNameList = void 0;
    exports.matchRealNameByContent = matchRealNameByContent;
    exports.defaultFirstNameList = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "郭", "马", "罗",
        "梁", "宋", "郑", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕", "苏",
        "卢", "蒋", "蔡", "贾", "丁", "魏", "薛", "叶", "阎", "余", "潘", "杜", "戴", "夏", "钟", "汪", "田", "任", "姜", "范",
        "石", "姚", "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔", "白", "崔", "康", "毛", "邱", "秦", "江", "史", "顾", "侯",
        "邵", "孟", "龙", "万", "段", "漕", "钱", "汤", "尹", "黎", "易", "常", "武", "乔", "贺", "赖", "龚", "文"
    ];
    function matchRealNameByContent({ content, firstNameList = exports.defaultFirstNameList }) {
        console.log(">> 匹配姓名");
        const findNames = [];
        for (let i = 0; i < firstNameList.length; i++) {
            const nameRegex = new RegExp(firstNameList[i] + "[\u4e00-\u9fff]{1,2}", 'g');
            let match;
            while ((match = nameRegex.exec(content)) !== null) {
                findNames.push(match[0]);
            }
        }
        return findNames;
    }
});
define("src/core/match/gender", ["require", "exports", "src/core/utils"], function (require, exports, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultFemalePronounList = exports.defaultMalePronounList = void 0;
    exports.matchGenderByContent = matchGenderByContent;
    exports.defaultMalePronounList = [
        "男",
        "他",
        "爷爷",
        "爸爸",
        "儿子",
        "先生",
        "丈夫",
        "哥哥",
        "弟弟",
        "叔叔",
        "伯伯",
        "舅舅",
        "侄子",
        "孙子",
        "外甥",
        "男士",
        "男友",
        "丈夫",
        "父亲",
        "祖父",
        "公公",
        "岳父",
        "表哥",
        "表弟",
        "男婴",
        "男孩",
        "少年",
        "青年",
        "姐夫",
        "兄弟"
    ];
    exports.defaultFemalePronounList = [
        "女",
        "她",
        "奶奶",
        "妈妈",
        "女儿",
        "女士",
        "女孩",
        "妻子",
        "姐姐",
        "妹妹",
        "阿姨",
        "姨妈",
        "舅妈",
        "侄女",
        "孙女",
        "外甥女",
        "小姐",
        "女友",
        "妻子",
        "母亲",
        "祖母",
        "婆婆",
        "岳母",
        "表姐",
        "表妹",
        "女婴",
        "女孩",
        "少女",
        "闺蜜"
    ];
    function matchGenderByContent({ content, malePronounList = exports.defaultMalePronounList, femalePronounList = exports.defaultFemalePronounList, }) {
        let maleCount = 0;
        let femaleCount = 0;
        malePronounList.forEach(k => {
            maleCount += (0, utils_2.withinContentNumber)(k, content);
        });
        femalePronounList.forEach(k => {
            femaleCount += (0, utils_2.withinContentNumber)(k, content);
        });
        let result = "未知";
        if (maleCount > femaleCount) {
            result = "男";
        }
        else if (femaleCount > maleCount) {
            result = "女";
        }
        return result;
    }
});
define("src/core/match/patient-chat", ["require", "exports", "src/core/dom"], function (require, exports, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultClassNames = void 0;
    exports.matchPatientChatByContent = matchPatientChatByContent;
    exports.defaultClassNames = ["div.clientfont", ".pull-left > div[0]"];
    function matchPatientChatByContent({ chatEl, separ = ",", classNames = exports.defaultClassNames }) {
        let elementArray = null;
        for (let i = 0; i < classNames.length; i++) {
            elementArray = chatEl.querySelectorAll(classNames[i]);
            if (elementArray != null && elementArray.length > 0) {
                break;
            }
        }
        let _str = "";
        (0, dom_1.forEachElements)(elementArray, (el) => {
            var _a, _b;
            const content = (_b = (_a = el.textContent) !== null && _a !== void 0 ? _a : el.innerText) !== null && _b !== void 0 ? _b : el.innerHTML;
            content && (_str += (content + separ));
        });
        return _str.replace(/<[^>]+>/g, '').replace(/[ ]|[&nbsp;]/g, '');
    }
});
define("src/core/match/address", ["require", "exports", "src/core/utils"], function (require, exports, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchAddressByContent = matchAddressByContent;
    const addressList = [
        {
            "key": 35,
            "value": "未知"
        },
        {
            "key": 18,
            "value": "湖南省"
        },
        {
            "key": 1,
            "value": "北京"
        },
        {
            "key": 19,
            "value": "广东"
        },
        {
            "key": 2,
            "value": "天津"
        },
        {
            "key": 20,
            "value": "广西"
        },
        {
            "key": 3,
            "value": "河北"
        },
        {
            "key": 21,
            "value": "海南"
        },
        {
            "key": 4,
            "value": "山西"
        },
        {
            "key": 22,
            "value": "重庆"
        },
        {
            "key": 5,
            "value": "内蒙古"
        },
        {
            "key": 23,
            "value": "四川"
        },
        {
            "key": 6,
            "value": "辽宁"
        },
        {
            "key": 24,
            "value": "贵州"
        },
        {
            "key": 7,
            "value": "吉林"
        },
        {
            "key": 25,
            "value": "云南"
        },
        {
            "key": 8,
            "value": "黑龙江"
        },
        {
            "key": 26,
            "value": "西藏"
        },
        {
            "key": 9,
            "value": "上海"
        },
        {
            "key": 27,
            "value": "陕西"
        },
        {
            "key": 10,
            "value": "江苏"
        },
        {
            "key": 28,
            "value": "甘肃"
        },
        {
            "key": 11,
            "value": "浙江"
        },
        {
            "key": 29,
            "value": "青海"
        },
        {
            "key": 12,
            "value": "安徽"
        },
        {
            "key": 30,
            "value": "宁夏"
        },
        {
            "key": 13,
            "value": "福建"
        },
        {
            "key": 31,
            "value": "新疆"
        },
        {
            "key": 14,
            "value": "江西"
        },
        {
            "key": 32,
            "value": "台湾"
        },
        {
            "key": 15,
            "value": "山东"
        },
        {
            "key": 33,
            "value": "香港"
        },
        {
            "key": 16,
            "value": "河南"
        },
        {
            "key": 34,
            "value": "澳门"
        },
        {
            "key": 17,
            "value": "湖北"
        }
    ];
    const addressJson = {
        "1": {
            "36": "北京"
        },
        "2": {
            "37": "天津"
        },
        "3": {
            "38": "石家庄",
            "39": "唐山",
            "40": "秦皇岛",
            "41": "邯郸",
            "42": "邢台",
            "43": "保定",
            "44": "张家口",
            "45": "承德",
            "46": "沧州",
            "47": "廊坊",
            "48": "衡水"
        },
        "4": {
            "49": "太原",
            "50": "大同",
            "51": "阳泉",
            "52": "长治",
            "53": "晋城",
            "54": "朔州",
            "55": "晋中",
            "56": "运城",
            "57": "忻州",
            "58": "临汾",
            "59": "吕梁"
        },
        "5": {
            "60": "呼和浩特",
            "61": "包头",
            "62": "乌海",
            "63": "赤峰",
            "64": "通辽",
            "65": "鄂尔多斯",
            "66": "呼伦贝尔",
            "67": "巴彦淖尔",
            "68": "乌兰察布",
            "69": "兴安盟",
            "70": "锡林郭勒盟",
            "71": "阿拉善盟"
        },
        "6": {
            "72": "沈阳",
            "73": "大连",
            "74": "鞍山",
            "75": "抚顺",
            "76": "本溪",
            "77": "丹东",
            "78": "锦州",
            "79": "营口",
            "80": "阜新",
            "81": "辽阳",
            "82": "盘锦",
            "83": "铁岭",
            "84": "朝阳",
            "85": "葫芦岛"
        },
        "7": {
            "86": "长春",
            "87": "吉林",
            "88": "四平",
            "89": "辽源",
            "90": "通化",
            "91": "白山",
            "92": "松原",
            "93": "白城",
            "94": "延边朝鲜族自治州"
        },
        "8": {
            "95": "哈尔滨",
            "96": "齐齐哈尔",
            "97": "鸡西",
            "98": "鹤岗",
            "99": "双鸭山",
            "100": "大庆",
            "101": "伊春",
            "102": "佳木斯",
            "103": "七台河",
            "104": "牡丹江",
            "105": "黑河",
            "106": "绥化",
            "107": "大兴安岭地区"
        },
        "9": {
            "108": "上海"
        },
        "10": {
            "109": "南京",
            "110": "无锡",
            "111": "徐州",
            "112": "常州",
            "113": "苏州",
            "114": "南通",
            "115": "连云港",
            "116": "淮安",
            "117": "盐城",
            "118": "扬州",
            "119": "镇江",
            "120": "泰州",
            "121": "宿迁"
        },
        "11": {
            "122": "杭州",
            "123": "宁波",
            "124": "温州",
            "125": "嘉兴",
            "126": "湖州",
            "127": "绍兴",
            "128": "金华",
            "129": "衢州",
            "130": "舟山",
            "131": "台州",
            "132": "丽水"
        },
        "12": {
            "133": "合肥",
            "134": "芜湖",
            "135": "蚌埠",
            "136": "淮南",
            "137": "马鞍山",
            "138": "淮北",
            "139": "铜陵",
            "140": "安庆",
            "141": "黄山",
            "142": "滁州",
            "143": "阜阳",
            "144": "宿州",
            "145": "六安",
            "146": "亳州",
            "147": "池州",
            "148": "宣城"
        },
        "13": {
            "149": "福州",
            "150": "厦门",
            "151": "莆田",
            "152": "三明",
            "153": "泉州",
            "154": "漳州",
            "155": "南平",
            "156": "龙岩",
            "157": "宁德"
        },
        "14": {
            "158": "南昌",
            "159": "景德镇",
            "160": "萍乡",
            "161": "九江",
            "162": "新余",
            "163": "鹰潭",
            "164": "赣州",
            "165": "吉安",
            "166": "宜春",
            "167": "抚州",
            "168": "上饶"
        },
        "15": {
            "169": "济南",
            "170": "青岛",
            "171": "淄博",
            "172": "枣庄",
            "173": "东营",
            "174": "烟台",
            "175": "潍坊",
            "176": "济宁",
            "177": "泰安",
            "178": "威海",
            "179": "日照",
            "180": "莱芜",
            "181": "临沂",
            "182": "德州",
            "183": "聊城",
            "184": "滨州",
            "185": "菏泽"
        },
        "16": {
            "186": "郑州",
            "187": "开封",
            "188": "洛阳",
            "189": "平顶山",
            "190": "安阳",
            "191": "鹤壁",
            "192": "新乡",
            "193": "焦作",
            "194": "濮阳",
            "195": "许昌",
            "196": "漯河",
            "197": "三门峡",
            "198": "南阳",
            "199": "商丘",
            "200": "信阳",
            "201": "周口",
            "202": "驻马店"
        },
        "17": {
            "203": "武汉",
            "204": "黄石",
            "205": "十堰",
            "206": "宜昌",
            "207": "襄阳",
            "208": "鄂州",
            "209": "荆门",
            "210": "孝感",
            "211": "荆州",
            "212": "黄冈",
            "213": "咸宁",
            "214": "随州",
            "215": "恩施土家族苗族自治州"
        },
        "18": {
            "216": "长沙",
            "217": "株洲",
            "218": "湘潭",
            "219": "衡阳",
            "220": "邵阳",
            "221": "岳阳",
            "222": "常德",
            "223": "张家界",
            "224": "益阳",
            "225": "郴州",
            "226": "永州",
            "227": "怀化",
            "228": "娄底",
            "229": "湘西土家族苗族自治州"
        },
        "19": {
            "230": "广州",
            "231": "韶关",
            "232": "深圳",
            "233": "珠海",
            "234": "汕头",
            "235": "佛山",
            "236": "江门",
            "237": "湛江",
            "238": "茂名",
            "239": "肇庆",
            "240": "惠州",
            "241": "梅州",
            "242": "汕尾",
            "243": "河源",
            "244": "阳江",
            "245": "清远",
            "246": "东莞",
            "247": "中山",
            "248": "东沙群岛",
            "249": "潮州",
            "250": "揭阳",
            "251": "云浮"
        },
        "20": {
            "252": "南宁",
            "253": "柳州",
            "254": "桂林",
            "255": "梧州",
            "256": "北海",
            "257": "防城港",
            "258": "钦州",
            "259": "贵港",
            "260": "玉林",
            "261": "百色",
            "262": "贺州",
            "263": "河池",
            "264": "来宾",
            "265": "崇左"
        },
        "21": {
            "266": "海口",
            "267": "三亚",
            "268": "三沙"
        },
        "22": {
            "269": "重庆"
        },
        "23": {
            "270": "成都",
            "271": "自贡",
            "272": "攀枝花",
            "273": "泸州",
            "274": "德阳",
            "275": "绵阳",
            "276": "广元",
            "277": "遂宁",
            "278": "内江",
            "279": "乐山",
            "280": "南充",
            "281": "眉山",
            "282": "宜宾",
            "283": "广安",
            "284": "达州",
            "285": "雅安",
            "286": "巴中",
            "287": "资阳",
            "288": "阿坝藏族羌族自治州",
            "289": "甘孜藏族自治州",
            "290": "凉山彝族自治州"
        },
        "24": {
            "291": "贵阳",
            "292": "六盘水",
            "293": "遵义",
            "294": "安顺",
            "295": "铜仁",
            "296": "黔西南布依族苗族自治州",
            "297": "毕节",
            "298": "黔东南苗族侗族自治州",
            "299": "黔南布依族苗族自治州"
        },
        "25": {
            "300": "昆明",
            "301": "曲靖",
            "302": "玉溪",
            "303": "保山",
            "304": "昭通",
            "305": "丽江",
            "306": "普洱",
            "307": "临沧",
            "308": "楚雄彝族自治州",
            "309": "红河哈尼族彝族自治州",
            "310": "文山壮族苗族自治州",
            "311": "西双版纳傣族自治州",
            "312": "大理白族自治州",
            "313": "德宏傣族景颇族自治州",
            "314": "怒江傈僳族自治州",
            "315": "迪庆藏族自治州"
        },
        "26": {
            "316": "拉萨",
            "317": "昌都",
            "318": "山南地区",
            "319": "日喀则",
            "320": "那曲地区",
            "321": "阿里地区",
            "322": "林芝"
        },
        "27": {
            "323": "西安",
            "324": "铜川",
            "325": "宝鸡",
            "326": "咸阳",
            "327": "渭南",
            "328": "延安",
            "329": "汉中",
            "330": "榆林",
            "331": "安康",
            "332": "商洛"
        },
        "28": {
            "333": "兰州",
            "334": "嘉峪关",
            "335": "金昌",
            "336": "白银",
            "337": "天水",
            "338": "武威",
            "339": "张掖",
            "340": "平凉",
            "341": "酒泉",
            "342": "庆阳",
            "343": "定西",
            "344": "陇南",
            "345": "临夏回族自治州",
            "346": "甘南藏族自治州"
        },
        "29": {
            "347": "西宁",
            "348": "海东",
            "349": "海北藏族自治州",
            "350": "黄南藏族自治州",
            "351": "海南藏族自治州",
            "352": "果洛藏族自治州",
            "353": "玉树藏族自治州",
            "354": "海西蒙古族藏族自治州"
        },
        "30": {
            "355": "银川",
            "356": "石嘴山",
            "357": "吴忠",
            "358": "固原",
            "359": "中卫"
        },
        "31": {
            "360": "乌鲁木齐",
            "361": "克拉玛依",
            "362": "吐鲁番",
            "363": "哈密地区",
            "364": "昌吉回族自治州",
            "365": "博尔塔拉蒙古自治州",
            "366": "巴音郭楞蒙古自治州",
            "367": "阿克苏地区",
            "368": "克孜勒苏柯尔克孜自治州",
            "369": "喀什地区",
            "370": "和田地区",
            "371": "伊犁哈萨克自治州",
            "372": "塔城地区",
            "373": "阿勒泰地区"
        },
        "32": {
            "374": "台北",
            "375": "高雄",
            "376": "台南",
            "377": "台中",
            "378": "金门县",
            "379": "南投县",
            "380": "基隆",
            "381": "新竹",
            "382": "嘉义",
            "383": "新北",
            "384": "宜兰县",
            "385": "新竹县",
            "386": "桃园县",
            "387": "苗栗县",
            "388": "彰化县",
            "389": "嘉义县",
            "390": "云林县",
            "391": "屏东县",
            "392": "台东县",
            "393": "花莲县",
            "394": "澎湖县",
            "395": "连江县"
        },
        "33": {
            "396": "香港岛",
            "397": "九龙",
            "398": "新界"
        },
        "34": {
            "399": "澳门半岛",
            "400": "离岛"
        },
        "35": {
            "401": "海外"
        },
        "00": {
            "1": "北京",
            "2": "天津",
            "3": "河北",
            "4": "山西",
            "5": "内蒙古自治区",
            "6": "辽宁",
            "7": "吉林",
            "8": "黑龙江",
            "9": "上海",
            "10": "江苏",
            "11": "浙江",
            "12": "安徽",
            "13": "福建",
            "14": "江西",
            "15": "山东",
            "16": "河南",
            "17": "湖北",
            "18": "湖南",
            "19": "广东",
            "20": "广西壮族自治区",
            "21": "海南",
            "22": "重庆",
            "23": "四川",
            "24": "贵州",
            "25": "云南",
            "26": "西藏自治区",
            "27": "陕西",
            "28": "甘肃",
            "29": "青海",
            "30": "宁夏回族自治区",
            "31": "新疆维吾尔自治区",
            "32": "台湾",
            "33": "香港特别行政区",
            "34": "澳门特别行政区",
            "35": "海外"
        }
    };
    function matchAddressByContent({ content }) {
        let key = null;
        let key_name = null;
        let key_num = null;
        for (let addressJsonElementKey in addressJson["00"]) {
            const _keyword = addressJson["00"][addressJsonElementKey];
            const _num = (0, utils_3.withinContentNumber)(_keyword, content);
            if (key_num == null || _num > key_num) {
                key_num = _num;
                key = addressJsonElementKey;
                key_name = _keyword;
            }
        }
        let city_name = null;
        let city_num = null;
        for (let addressJsonElementKey in addressJson[key]) {
            const _keyword = addressJson[key][addressJsonElementKey];
            const _num = (0, utils_3.withinContentNumber)(_keyword, content);
            if (city_num == null || _num > city_num) {
                city_num = _num;
                city_name = _keyword;
            }
        }
        for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].value.indexOf(key_name) != -1) {
                return [
                    addressList[i],
                    city_name
                ];
            }
        }
        return [
            addressList[0],
            city_name
        ];
    }
});
define("src/core/match/age", ["require", "exports", "src/core/utils"], function (require, exports, utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchAgeByContent = matchAgeByContent;
    function matchAgeByContent({ content }) {
        if (!content) {
            return 0;
        }
        const ageRegex = /\b\d{1,3}\b/g;
        let match;
        const ages = [];
        while ((match = ageRegex.exec(content)) !== null) {
            const _age = Number(match[0]);
            if (_age >= 0 && _age <= 120) {
                ages.push(_age);
            }
        }
        if (ages.length == 0) {
            return 0;
        }
        if (ages.length == 1) {
            return ages[0];
        }
        if ((0, utils_4.unique)(ages).length == ages.length) {
            return ages[0];
        }
        const map = {};
        ages.forEach(age => {
            if (map[age] != null) {
                map[age] = map[age] + 1;
            }
            else {
                map[age] = 1;
            }
        });
        let r = null;
        Object.keys(map).forEach(key => {
            if (r == null || map[key] > map[r]) {
                r = key;
            }
        });
        return Number(r);
    }
});
define("src/core/match/phone", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchPhoneByContent = matchPhoneByContent;
    function matchPhoneByContent({ content }) {
        if (!content) {
            return null;
        }
        const phoneRegex = /(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}/g;
        const phones = [];
        let match;
        while ((match = phoneRegex.exec(content)) !== null) {
            phones.push(match[0]);
        }
        console.log(">> 匹配到手机号", phones);
        return phones;
    }
});
define("src/core/match/swtid", ["require", "exports", "src/core/utils"], function (require, exports, utils_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchSwtIdByContent = matchSwtIdByContent;
    function matchSwtIdByContent({ content, autoGen = true }) {
        const uuidRegex = /[0-9a-fA-F]{32}/g;
        let match;
        let uuids = [];
        while ((match = uuidRegex.exec(content)) !== null) {
            uuids.push(match[0]);
        }
        uuids = (0, utils_5.unique)(uuids);
        if (uuids.length > 0) {
            return uuids;
        }
        else {
            if (autoGen) {
                return [(0, utils_5.genSwtId)()];
            }
            else {
                return null;
            }
        }
    }
});
define("src/core/match/date", ["require", "exports", "src/core/utils"], function (require, exports, utils_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchDateByContent = matchDateByContent;
    function matchDateByContent({ content }) {
        const regex = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s+(0[0-9]|1[0-9]|2[0-3]):([0-5]\d):([0-5]\d)/g;
        let match;
        let dates = [];
        while ((match = regex.exec(content)) !== null) {
            dates.push(match[0]);
        }
        return (0, utils_6.unique)(dates);
    }
});
define("src/core/match/robot", ["require", "exports", "src/core/utils"], function (require, exports, utils_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultRobotKeywordList = void 0;
    exports.matchIsRobotByContent = matchIsRobotByContent;
    exports.defaultRobotKeywordList = ["机器人", "智能机器人"];
    function matchIsRobotByContent({ content, robotKeywordList = exports.defaultRobotKeywordList }) {
        let num = 0;
        robotKeywordList.forEach(keyword => {
            num += (0, utils_7.withinContentNumber)(keyword, content !== null && content !== void 0 ? content : "");
        });
        return num > 0;
    }
});
define("src/core/match/index", ["require", "exports", "src/core/match/gender", "src/core/match/address", "src/core/match/age", "src/core/match/keywords", "src/core/match/phone", "src/core/match/real-name", "src/core/match/source-type", "src/core/match/swtid", "src/core/match/date", "src/core/match/robot", "src/core/match/patient-chat"], function (require, exports, gender_1, address_1, age_1, keywords_1, phone_1, real_name_1, source_type_1, swtid_1, date_1, robot_1, patient_chat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(gender_1, exports);
    __exportStar(address_1, exports);
    __exportStar(age_1, exports);
    __exportStar(keywords_1, exports);
    __exportStar(phone_1, exports);
    __exportStar(real_name_1, exports);
    __exportStar(source_type_1, exports);
    __exportStar(swtid_1, exports);
    __exportStar(date_1, exports);
    __exportStar(robot_1, exports);
    __exportStar(patient_chat_1, exports);
});
define("src/logic/auto-set-form", ["require", "exports", "src/core/dom", "src/core/utils", "src/core/match/index", "src/core/match/patient-chat"], function (require, exports, dom_2, utils_8, match_1, patient_chat_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autoSetForm = autoSetForm;
    function getElements() {
        const root = document.querySelector("iframe").contentWindow.document.querySelector("iframe").contentWindow.document;
        const chatRecord = root.querySelector("iframe").contentWindow.document.getElementsByTagName("body")[0];
        const source = root.getElementById("TabContainer1_tpBase_ddlPatientsSource");
        const gender = root.getElementById("TabContainer1_tpBase_ddlGender");
        const mobilePhoneFirst = root.getElementById("TabContainer1_tpBase_txtMobilePhoneFirst");
        const mobilePhoneSecond = root.getElementById("TabContainer1_tpBase_txtMobilePhoneSecond");
        const age = root.getElementById("TabContainer1_tpBase_txtAge");
        const time = root.getElementById("TabContainer1_tpBase_txtVisitTime");
        const swtid = root.getElementById("TabContainer1_tpBase_txtSWTID");
        const realName = root.getElementById("TabContainer1_tpBase_txtName");
        const provinces = root.getElementsByName("TabContainer1$tpBase$ssProvince$rblCheck");
        const area = root.getElementById("TabContainer1_tpBase_txtAddress");
        const keyword = root.getElementById("TabContainer1_tpBase_txtKeyword");
        const device = root.getElementById("TabContainer1_tpBase_ddlPatientsDevice");
        const disease = root.getElementById("TabContainer1_tpBase_txtDiseaseSituation");
        return {
            root,
            chatRecord,
            chatRecordText: chatRecord.outerHTML,
            blurMobilePhoneFirst() {
                mobilePhoneFirst.blur();
            },
            setPhone(value) {
                if (value && value.length > 0) {
                    mobilePhoneFirst.value = value[0];
                    if (value.length > 1) {
                        mobilePhoneSecond.value = value[1];
                    }
                }
            },
            setGender(value) {
                var _a;
                (0, dom_2.forEachElements)((_a = gender === null || gender === void 0 ? void 0 : gender.children) !== null && _a !== void 0 ? _a : [], (element, _, els) => {
                    if (element.innerText == value) {
                        (0, dom_2.forEachElements)(els, el => el.removeAttribute("selected"));
                        element.setAttribute("selected", "selected");
                        return true;
                    }
                });
            },
            setAge(value) {
                age.value = value;
            },
            setRealName(value) {
                realName.value = value;
            },
            setSource(value) {
                var _a;
                if (!value) {
                    return;
                }
                (0, dom_2.forEachElements)((_a = source === null || source === void 0 ? void 0 : source.children) !== null && _a !== void 0 ? _a : [], (element, _, els) => {
                    if (element.innerText == value) {
                        (0, dom_2.forEachElements)(els, el => el.removeAttribute("selected"));
                        element.setAttribute("selected", "selected");
                        return true;
                    }
                });
                (0, dom_2.eventOnChange)(source);
            },
            setTime(value) {
                time.value = value;
            },
            setSwtId(value) {
                swtid.value = value;
            },
            setProvince(value) {
                (0, dom_2.forEachElements)(provinces !== null && provinces !== void 0 ? provinces : [], (element) => {
                    if (element.value == value) {
                        element.click();
                        return true;
                    }
                });
            },
            setArea(value) {
                area.value = value;
            },
            setKeyword(value) {
                keyword.value = value;
            },
            setDevice(value) {
                var _a;
                if (!value) {
                    return;
                }
                (0, dom_2.forEachElements)((_a = device === null || device === void 0 ? void 0 : device.children) !== null && _a !== void 0 ? _a : [], (element, _, els) => {
                    if (element.innerText == value) {
                        (0, dom_2.forEachElements)(els, el => el.removeAttribute("selected"));
                        element.setAttribute("selected", "selected");
                        return true;
                    }
                });
            },
            setDisease(value) {
                disease.value = value;
            }
        };
    }
    function autoSetForm(config) {
        var _a, _b, _c, _d;
        try {
            const els = getElements();
            if (els.chatRecord == null || (0, utils_8.isBlankString)(els.chatRecord.innerText)) {
                layer.msg("聊天记录框内没有内容，请检查！");
                return;
            }
            ;
            els.blurMobilePhoneFirst();
            els.setDevice("手机");
            els.setSource((_a = (0, match_1.matchSourceTypeByContent)({
                content: els.chatRecordText,
                sourceTypeList: config.sourceTypeList
            })) === null || _a === void 0 ? void 0 : _a.value);
            els.setTime((_c = (_b = (0, match_1.matchDateByContent)({
                content: els.chatRecordText
            })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : (0, utils_8.formatDate)("yyyy-MM-dd hh:mm:ss"));
            els.setSwtId((_d = (0, match_1.matchSwtIdByContent)({
                content: els.chatRecordText,
                autoGen: true
            })) === null || _d === void 0 ? void 0 : _d[0]);
            const [addressObjResult, areaName] = (0, match_1.matchAddressByContent)({
                content: els.chatRecordText
            });
            els.setProvince(addressObjResult.key);
            els.setArea(areaName);
            els.setKeyword((0, match_1.matchKeywordsByContent)({
                content: els.chatRecordText,
                keywordPrefixList: config.keywordPrefixList
            }));
            const message = (0, patient_chat_2.matchPatientChatByContent)({
                chatEl: els.chatRecord,
                classNames: config.classNames
            });
            els.setDisease(message);
            els.setAge((0, match_1.matchAgeByContent)({
                content: message
            }));
            els.setRealName((0, match_1.matchRealNameByContent)({
                content: message,
                firstNameList: config.firstNameList
            }));
            els.setPhone((0, match_1.matchPhoneByContent)({
                content: message
            }));
            els.setGender((0, match_1.matchGenderByContent)({
                content: message,
                malePronounList: config.malePronounList,
                femalePronounList: config.femalePronounList
            }));
        }
        catch (e) {
            console.error(e);
            layer.msg("请确认当前页面是否为添加患者页面!");
        }
    }
});
define("src/view/setting-modal", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.settingModal = settingModal;
    const style_text = `.layui-layer-tab .layui-layer-title span.layui-layer-tabnow {
    height: auto;
}`;
    function settingModal() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = style_text;
        document.head.appendChild(style);
        let open = (config) => {
            layer.tab({
                area: ['600px', '300px'],
                tab: [{
                        title: '男女判断配置',
                        content: `<div style="padding: 16px;">
                    <div>注意：一定要用英文的“,”分割，示例： 男,哥哥,弟弟</div>
                    <div>
                        <label>男性判断词</label>
                        <div>
                            <textarea id="malePronounList" rows="5" placeholder="请输入男性判断词" style="width: 100%">${config.malePronounList.toString()}</textarea>
                        </div>
                    </div>
                    <div>
                        <label>女性判断词</label>
                        <div>
                            <textarea id="femalePronounList" rows="5" placeholder="请输入女性判断词" style="width: 100%">${config.femalePronounList.toString()}</textarea>
                        </div>
                    </div>
                </div>`
                    }, {
                        title: '姓名判断配置',
                        content: `
                    <div style="padding: 16px;">
                        <div>姓列表，根据姓氏匹配(注意：一定要用英文的“,”分割，示例： 张,刘,孟)</div>
                        <div>
                            <label>姓名判断词</label>
                            <div>
                                <textarea id="firstNameList" rows="5" placeholder="请输入姓名判断词" style="width: 100%">${config.firstNameList.toString()}</textarea>
                            </div>
                        </div>
                    </div>
                `
                    }, {
                        title: '关键词判断配置',
                        content: `
                    <div style="padding: 16px;">
                        <div>关键词前缀列表，根据前缀匹配(注意：一定要用英文的“,”分割，示例： 搜索词：,)</div>
                        <div>
                            <label>关键词前缀列表</label>
                            <div>
                                <textarea id="keywordPrefixList" rows="5" placeholder="请输入关键词前缀列表" style="width: 100%">${config.keywordPrefixList.toString()}</textarea>
                            </div>
                        </div>
                    </div>
                `
                    }],
                shadeClose: true
            });
        };
        return { open };
    }
});
define("src/hooks/useLocalStorage", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLocalStorage = useLocalStorage;
    function toJson(value) {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                console.warn("useLocalStorage JSON反序列化失败", e);
            }
        }
        return value;
    }
    function toStr(value) {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        if (typeof value === 'string') {
            return value;
        }
        try {
            return JSON.stringify(value);
        }
        catch (e) {
            console.warn("useLocalStorage JSON序列化失败", e);
        }
        return value + "";
    }
    function useLocalStorage(key, options) {
        const { defaultValue } = options;
        let result = defaultValue;
        const oldValue = window.localStorage.getItem(key);
        if (!oldValue) {
            window.localStorage.setItem(key, toStr(defaultValue));
        }
        else {
            result = toJson(oldValue);
        }
        function setItem(val) {
            window.localStorage.setItem(key, toStr(val));
            result = toJson(result);
        }
        return [result, setItem];
    }
});
define("src/view/context-menu", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContextMenu = ContextMenu;
    const styleInnerText = `
.custom-context-menu {
  position: fixed;
  border: 1px solid #ccc;
  list-style: none;
  padding: 4px 0;
  border-radius: 4px;
  box-shadow: 0px 2px 6px 2px #ddd;
  z-index: 10000;
  background: #fff;
}
.custom-context-menu.hidden {
    display: none;
}
.custom-context-menu > li {
    padding: 8px 12px;
    border-bottom: 1px solid #f0f2f5;
    user-select: none;
    transition: all 0.1s;
}
.custom-context-menu > li:last-child {
      border-bottom: none;
}
.custom-context-menu > li:hover {
  cursor: pointer;
  background-color: #0170fe;
  color: #fff;
}
.custom-context-menu > li:active {
  background-color: #f0f2f7;
}
`;
    function ContextMenu(options) {
        let instance;
        function createMenu() {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = styleInnerText;
            document.head.appendChild(style);
            const ul = document.createElement("ul");
            ul.classList.add("custom-context-menu");
            const { menus } = options;
            const body = document.querySelector("body");
            body.appendChild(ul);
            const wrapper = document.createElement('div');
            wrapper.setAttribute('style', 'display:none;width:100%;height:100%;z-index:8888;position:absolute;top:0;left:0;');
            wrapper.id = "custom-context-menu-bg";
            document.body.appendChild(wrapper);
            function close() {
                ul.style.display = 'none';
                wrapper.style.display = 'none';
            }
            if (menus && menus.length > 0) {
                for (let menu of menus) {
                    const li = document.createElement("li");
                    li.textContent = menu.name;
                    li.onclick = (e) => {
                        menu.onClick && menu.onClick(e);
                        close();
                    };
                    ul.appendChild(li);
                }
            }
            wrapper.onclick = () => close();
            wrapper.oncontextmenu = (e) => close();
            return [ul, wrapper];
        }
        return {
            getInstance: function () {
                if (!instance) {
                    instance = createMenu();
                }
                return instance;
            },
            showMenu: function (event) {
                const [menus, wr] = this.getInstance();
                menus.style.top = `${event.clientY}px`;
                menus.style.left = `${event.clientX}px`;
                menus.style.display = "block";
                wr.style.display = "block";
            },
            hindMenu: function (event) {
                const [menus, wr] = this.getInstance();
                menus.style.display = "none";
                wr.style.display = "block";
            }
        };
    }
    ;
});
define("app", ["require", "exports", "src/view/draggable-button", "src/logic/auto-set-form", "src/view/setting-modal", "src/hooks/useLocalStorage", "src/view/context-menu", "src/core/match/index"], function (require, exports, draggable_button_1, auto_set_form_1, setting_modal_1, useLocalStorage_1, context_menu_1, match_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = exports.isInit = void 0;
    exports.init = init;
    exports.isInit = false;
    function init({ callback } = {}) {
        const defaultConfig = {
            keywordPrefixList: match_2.defaultKeywordPrefixList,
            sourceTypeList: match_2.defaultSourceTypeList,
            firstNameList: match_2.defaultFirstNameList,
            femalePronounList: match_2.defaultFemalePronounList,
            malePronounList: match_2.defaultMalePronounList,
            classNames: match_2.defaultClassNames,
        };
        const [config, setConfig] = (0, useLocalStorage_1.useLocalStorage)("recording_plugin_config_cache", {
            defaultValue: defaultConfig
        });
        const modal = (0, setting_modal_1.settingModal)();
        const contextMenu = (0, context_menu_1.ContextMenu)({
            menus: [
                {
                    name: "配置管理",
                    onClick() {
                        modal.open(config);
                    }
                }
            ]
        });
        if (exports.isInit)
            return;
        (0, draggable_button_1.draggableButton)({
            onClick: (e) => {
                contextMenu.hindMenu(e);
            },
            onDblClick: () => (0, auto_set_form_1.autoSetForm)(config),
            onContextMenuClick: (e) => contextMenu.showMenu(e)
        });
        callback && callback();
        exports.isInit = true;
    }
    exports.version = 'v3.2.1';
});
