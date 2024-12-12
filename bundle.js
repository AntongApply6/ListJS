define("lib/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withinContentNumber = withinContentNumber;
    exports.withinContentArrayNumber = withinContentArrayNumber;
    exports.isEmptyArray = isEmptyArray;
    exports.isBlankString = isBlankString;
    exports.forEachElements = forEachElements;
    exports.formatDate = formatDate;
    exports.eventOnChange = eventOnChange;
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
    function forEachElements(els, fn) {
        for (let i = 0; i < (els !== null && els !== void 0 ? els : []).length; i++) {
            if (fn(els[i], i, els))
                return;
        }
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
define("core/config/modules/gender", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dm = [
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
    const df = [
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
    exports.default = {
        malePronouns: dm,
        femalePronouns: df,
        defaultValue: "未知"
    };
});
define("core/config/modules/address", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = [
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
});
define("core/config/modules/robot", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        keywords: ["机器人", "智能机器人"]
    };
});
define("core/config/modules/preference", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        deviceType: "手机",
        sourceType: [
            {
                keywords: ["百度搜索推广"],
                value: "百度竞价"
            }
        ],
        swtIdIsNullAutoGen: true,
    };
});
define("core/config/modules/names", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "徐", "孙", "胡", "朱", "高", "林", "郭", "马", "罗",
        "梁", "宋", "郑", "韩", "唐", "冯", "于", "董", "萧", "程", "曹", "袁", "邓", "许", "傅", "沈", "曾", "彭", "吕", "苏",
        "卢", "蒋", "蔡", "贾", "丁", "魏", "薛", "叶", "阎", "余", "潘", "杜", "戴", "夏", "钟", "汪", "田", "任", "姜", "范",
        "石", "姚", "谭", "廖", "邹", "熊", "金", "陆", "郝", "孔", "白", "崔", "康", "毛", "邱", "秦", "江", "史", "顾", "侯",
        "邵", "孟", "龙", "万", "段", "漕", "钱", "汤", "尹", "黎", "易", "常", "武", "乔", "贺", "赖", "龚", "文"
    ];
});
define("core/hooks/useLocalStorage", ["require", "exports"], function (require, exports) {
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
define("core/config/index", ["require", "exports", "core/config/modules/gender", "core/config/modules/address", "core/config/modules/robot", "core/config/modules/preference", "core/config/modules/names", "core/hooks/useLocalStorage", "lib/utils"], function (require, exports, gender_1, address_1, robot_1, preference_1, names_1, useLocalStorage_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGenderConfig = getGenderConfig;
    exports.getAddressConfig = getAddressConfig;
    exports.getRobotConfig = getRobotConfig;
    exports.getPreferenceConfig = getPreferenceConfig;
    exports.getFirstNamesConfig = getFirstNamesConfig;
    exports.updateConfig = updateConfig;
    const defaultConfig = {
        addressConfig: address_1.default,
        genderConfig: gender_1.default,
        robotConfig: robot_1.default,
        preferenceConfig: preference_1.default,
        firstNames: names_1.default
    };
    const [cacheConfig, setCacheConfig] = (0, useLocalStorage_1.useLocalStorage)("_recording_config", {
        defaultValue: defaultConfig
    });
    function getGenderConfig() {
        return cacheConfig.genderConfig;
    }
    function getAddressConfig() {
        return cacheConfig.addressConfig;
    }
    function getRobotConfig() {
        return cacheConfig.robotConfig;
    }
    function getPreferenceConfig() {
        return cacheConfig.preferenceConfig;
    }
    function getFirstNamesConfig() {
        return cacheConfig.firstNames;
    }
    function updateConfig(keyPath, value) {
        setCacheConfig((0, utils_1.upobj)(cacheConfig, keyPath, value));
    }
    exports.default = cacheConfig;
});
define("lib/addres", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
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
});
define("core/common", ["require", "exports", "lib/utils", "core/config/index", "lib/addres"], function (require, exports, utils_2, index_1, addres_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withinAddressContent = withinAddressContent;
    exports.withinGenderByContent = withinGenderByContent;
    exports.withinKeywordsByContent = withinKeywordsByContent;
    exports.withinSwtIdByContent = withinSwtIdByContent;
    exports.withinPhoneByContent = withinPhoneByContent;
    exports.withinRealNameByContent = withinRealNameByContent;
    exports.withinAgeByContent = withinAgeByContent;
    exports.withinSourceTypeByContent = withinSourceTypeByContent;
    exports.isRobotByChatRecord = isRobotByChatRecord;
    exports.isRobotByChatRecordText = isRobotByChatRecordText;
    function withinAddressContent(content) {
        let key = null;
        let key_name = null;
        let key_num = null;
        for (let addressJsonElementKey in addres_1.default["00"]) {
            const _keyword = addres_1.default["00"][addressJsonElementKey];
            const _num = (0, utils_2.withinContentNumber)(_keyword, content);
            if (key_num == null || _num > key_num) {
                key_num = _num;
                key = addressJsonElementKey;
                key_name = _keyword;
            }
        }
        let city_name = null;
        let city_num = null;
        for (let addressJsonElementKey in addres_1.default[key]) {
            const _keyword = addres_1.default[key][addressJsonElementKey];
            const _num = (0, utils_2.withinContentNumber)(_keyword, content);
            if (city_num == null || _num > city_num) {
                city_num = _num;
                city_name = _keyword;
            }
        }
        const config = (0, index_1.getAddressConfig)();
        for (let i = 0; i < config.length; i++) {
            if (config[i].value.indexOf(key_name) != -1) {
                return [
                    config[i],
                    city_name
                ];
            }
        }
        return [
            config[0],
            city_name
        ];
    }
    function withinGenderByContent(content) {
        console.log(">> 匹配查找性别");
        const config = (0, index_1.getGenderConfig)();
        let maleCount = 0;
        let femaleCount = 0;
        config.malePronouns.forEach(k => {
            maleCount += (0, utils_2.withinContentNumber)(k, content);
        });
        config.femalePronouns.forEach(k => {
            femaleCount += (0, utils_2.withinContentNumber)(k, content);
        });
        let result = config.defaultValue;
        if (maleCount > femaleCount) {
            result = "男";
        }
        else if (femaleCount > maleCount) {
            result = "女";
        }
        console.log(`>> 匹配到性别${result}`);
        return result;
    }
    function withinKeywordsByContent(content, isRobot) {
        let message = "";
        if (!isRobot) {
            const ind = content.indexOf("搜索词：");
            message = content.slice(ind + 4, content.indexOf("<br>", ind));
        }
        if (content.indexOf("智能机器人") != -1) {
            const ind = content.indexOf("搜索词：");
            message = content.slice(ind + 4, content.indexOf("<br>", ind));
        }
        if (content.indexOf("访客静态ID") != -1) {
            const ind = content.indexOf("搜索词：");
            message = content.slice(ind + 4, content.indexOf("<br>", ind));
        }
        message = message.replace(/<[^>]+>/g, '').replace(/[ ]|[&nbsp;]/g, '');
        return message;
    }
    function withinSwtIdByContent(content) {
        const uuidRegex = /[0-9a-fA-F]{32}/g;
        console.log(">> >> 开始匹配商务通ID, 匹配正则: ", uuidRegex);
        let match;
        let uuids = [];
        while ((match = uuidRegex.exec(content)) !== null) {
            uuids.push(match[0]);
        }
        uuids = (0, utils_2.unique)(uuids);
        if (uuids.length > 0) {
            if (uuids.length > 1) {
                console.warn(">> >> 匹配到多个商务通ID, 默认选择第一个", uuids);
            }
            return uuids[0];
        }
        else {
            console.warn(">> >> 未匹配到商务通ID, 查询配置是否自动生成");
            const config = (0, index_1.getPreferenceConfig)();
            if (config.swtIdIsNullAutoGen) {
                console.log(">> >> 配置为自动生成商务通ID");
                return (0, utils_2.genSwtId)();
            }
            else {
                console.log(">> >> 配置为不自动生成商务通ID");
                return null;
            }
        }
    }
    function withinPhoneByContent(content) {
        console.log(">> 开始匹配手机号");
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
    function withinRealNameByContent(content) {
        console.log(">> 匹配姓名");
        const firstNames = (0, index_1.getFirstNamesConfig)();
        const findNames = [];
        for (let i = 0; i < firstNames.length; i++) {
            const nameRegex = new RegExp(firstNames[i] + "[\u4e00-\u9fff]{1,2}", 'g');
            let match;
            while ((match = nameRegex.exec(content)) !== null) {
                findNames.push(match[0]);
            }
        }
        console.log(">> 匹配到姓名", findNames);
        return findNames;
    }
    function withinAgeByContent(content) {
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
        if ((0, utils_2.unique)(ages).length == ages.length) {
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
    function withinSourceTypeByContent(content) {
        var _a;
        console.log(">> >> 开始匹配来源类型");
        if ((0, utils_2.isBlankString)(content)) {
            return null;
        }
        const config = (0, index_1.getPreferenceConfig)();
        console.log(">> >> 来源类型配置为：", config);
        let result;
        ((_a = config.sourceType) !== null && _a !== void 0 ? _a : []).forEach(source => {
            var _a;
            let num = 0;
            ((_a = source.keywords) !== null && _a !== void 0 ? _a : []).forEach((keyword) => {
                num += (0, utils_2.withinContentNumber)(keyword, content);
            });
            console.log(">> >> >>权重：" + num + ", 值: " + source.value + ", 匹配关键词组: ", source.keywords);
            if (result) {
                if (num >= result.count) {
                    result = Object.assign(Object.assign({}, result), { count: num });
                }
            }
            else {
                result = Object.assign(Object.assign({}, source), { count: num });
            }
        });
        console.log(">> >> 匹配来源类型成功, 匹配值为: ", result);
        return result;
    }
    function isRobotByChatRecord(el) {
        return isRobotByChatRecordText(el.outerHTML);
    }
    function isRobotByChatRecordText(text) {
        console.log(">> 校验是否是机器人");
        const config = (0, index_1.getRobotConfig)();
        let num = 0;
        config.keywords.forEach(keyword => {
            num += (0, utils_2.withinContentNumber)(keyword, text !== null && text !== void 0 ? text : "");
        });
        console.log(">>", num > 0 ? '是机器人' : '人工');
        return num > 0;
    }
});
define("core/element", ["require", "exports", "lib/utils", "core/config/index", "core/common"], function (require, exports, utils_3, index_2, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRootElement = getRootElement;
    exports.getChatRecordElement = getChatRecordElement;
    exports.formatChatRecord = formatChatRecord;
    exports.autoInsertKeywords = autoInsertKeywords;
    exports.autoSelectedDeviceType = autoSelectedDeviceType;
    exports.autoSelectedSourceType = autoSelectedSourceType;
    exports.autoSelectedCreateData = autoSelectedCreateData;
    exports.autoInsertSwtId = autoInsertSwtId;
    exports.autoInsertPatientInformation = autoInsertPatientInformation;
    exports.autoInsertPhones = autoInsertPhones;
    exports.autoInsertRealName = autoInsertRealName;
    exports.autoInsertCreateDate = autoInsertCreateDate;
    exports.autoSelectGender = autoSelectGender;
    exports.autoInsertAge = autoInsertAge;
    exports.autoInsertAddress = autoInsertAddress;
    function getRootElement() {
        return document.querySelector("iframe").contentWindow.document.querySelector("iframe").contentWindow.document;
    }
    function getChatRecordElement(rootEl) {
        return (rootEl !== null && rootEl !== void 0 ? rootEl : getRootElement()).querySelector("iframe").contentWindow.document.getElementsByTagName("body")[0];
    }
    function formatChatRecord(rootEl, chatEl) {
        var _a, _b, _c, _d, _e;
        console.log(">> 开始格式化聊天记录内容");
        (0, utils_3.forEachElements)((_a = chatEl.getElementsByClassName("clientnamefont")) !== null && _a !== void 0 ? _a : [], element => {
            element.setAttribute("style", "font-size:10.5pt;color:green;");
        });
        (0, utils_3.forEachElements)((_b = chatEl.getElementsByClassName("clientfont")) !== null && _b !== void 0 ? _b : [], element => {
            element.setAttribute("style", "font-size:10.5pt;color:purple;margin-left:5px;");
        });
        (0, utils_3.forEachElements)((_c = chatEl.getElementsByClassName("sysfont")) !== null && _c !== void 0 ? _c : [], element => {
            element.setAttribute("style", "font-size:10.5pt;color:salmon;");
        });
        (0, utils_3.forEachElements)((_d = chatEl.getElementsByClassName("operatornamefont")) !== null && _d !== void 0 ? _d : [], element => {
            element.setAttribute("style", "font-size:10.5pt;color:blue;");
        });
        (0, utils_3.forEachElements)((_e = chatEl.getElementsByClassName("operatorfont")) !== null && _e !== void 0 ? _e : [], element => {
            element.setAttribute("style", "font-size:10.5pt;margin-left:5px;");
        });
        const elementById = rootEl.getElementById("TabContainer1_tpBase_hfChatRecord");
        elementById.value = chatEl.outerHTML;
        console.log(">> 格式化聊天记录内容完成");
    }
    function autoInsertKeywords(rootEl, contentStr, isRobot) {
        rootEl.getElementById("TabContainer1_tpBase_txtKeyword").value = (0, common_1.withinKeywordsByContent)(contentStr, isRobot);
    }
    function autoSelectedDeviceType(rootEl) {
        var _a;
        const preferenceConfig = (0, index_2.getPreferenceConfig)();
        console.log(">> 开始自动选择设备类型, 配置：", preferenceConfig.deviceType);
        let logV;
        (0, utils_3.forEachElements)((_a = rootEl.getElementById("TabContainer1_tpBase_ddlPatientsDevice").children) !== null && _a !== void 0 ? _a : [], (element, _, els) => {
            var _a;
            if (element.outerText == preferenceConfig.deviceType || ((_a = preferenceConfig.deviceType) !== null && _a !== void 0 ? _a : "").indexOf(element.outerText) != -1) {
                (0, utils_3.forEachElements)(els, el => el.removeAttribute("selected"));
                element.setAttribute("selected", "selected");
                logV = element.outerText;
                return true;
            }
        });
        console.log(">> 自动选择设备类型完成, 结果为：", logV);
    }
    function autoSelectedSourceType(rootEl, chatRecordText) {
        var _a;
        console.log(">> 开始自动选择来源类型");
        const sourceEl = rootEl.getElementById("TabContainer1_tpBase_ddlPatientsSource");
        const sourceType = (0, common_1.withinSourceTypeByContent)(chatRecordText);
        if (!sourceType) {
            return;
        }
        const typeStr = sourceType.value;
        (0, utils_3.forEachElements)((_a = sourceEl.children) !== null && _a !== void 0 ? _a : [], (element, _, els) => {
            if (element.innerText == typeStr) {
                (0, utils_3.forEachElements)(els, el => el.removeAttribute("selected"));
                element.setAttribute("selected", "selected");
                return true;
            }
        });
        (0, utils_3.eventOnChange)(sourceEl);
        console.log(">> 自动选择来源类型完成");
    }
    function autoSelectedCreateData(rootEl, chatRecordText) {
        let val = (0, utils_3.formatDate)("yyyy-MM-dd hh:mm:ss", new Date());
        if ((0, common_1.isRobotByChatRecordText)(chatRecordText)) {
            const index = chatRecordText.indexOf(new Date().getFullYear() + "");
            val = chatRecordText.slice(index, index + 19);
        }
        const el = rootEl.getElementById("TabContainer1_tpBase_txtVisitTime");
        el.value = val;
    }
    function autoInsertSwtId(rootEl, chatRecordText) {
        console.log(">> 开始自动插入商务通ID");
        const swtId = (0, common_1.withinSwtIdByContent)(chatRecordText);
        if (swtId) {
            const el = rootEl.getElementById("TabContainer1_tpBase_txtSWTID");
            el.value = swtId;
        }
        console.log("自动插入商务通ID完成");
    }
    function autoInsertPatientInformation(rootEl, chatRecordText, isRobot) {
        const Separ = ",";
        const _chatRecordRoot = rootEl.querySelector("iframe").contentWindow.document.getElementsByTagName("body")[0];
        function getChildrenText(elementsByClassName) {
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
        function interceptInfo() {
            if (!isRobot) {
                const elementArray = _chatRecordRoot.getElementsByClassName("clientfont");
                let _str = "";
                for (let i = 0; i < elementArray.length; i++) {
                    if (elementArray[i].tagName.toUpperCase() == "DIV") {
                        const content = elementArray[i].textContent;
                        content && (_str += (content + Separ));
                    }
                }
                return _str;
            }
            if ((0, utils_3.withinContentArrayNumber)((0, index_2.getRobotConfig)().keywords, chatRecordText) > 0) {
                const elementArray = _chatRecordRoot.getElementsByClassName("pull-left");
                let _str = "";
                for (let i = 0; i < elementArray.length; i++) {
                    const content = getChildrenText(elementArray[i].getElementsByClassName("talk-user"));
                    content && (_str += (content + Separ));
                }
                return _str;
            }
            if (chatRecordText.indexOf("访客静态ID") != -1) {
                return "";
            }
            const elementArray = _chatRecordRoot.getElementsByClassName("fk");
            let _str = "";
            for (let i = 0; i < elementArray.length; i++) {
                const _ = elementArray[i].getElementsByClassName("bubbleCon");
                let content = "";
                for (let j = 0; j < _.length; j++) {
                    content += (_[j].textContent || _[j].innerHTML) + "/";
                }
                content && (_str += (content + Separ));
            }
            return _str;
        }
        const txtDiseaseSituation = rootEl.getElementById("TabContainer1_tpBase_txtDiseaseSituation");
        if (txtDiseaseSituation) {
            const message = interceptInfo();
            txtDiseaseSituation.value = message;
            return message;
        }
        else {
            console.error('Element with id "TabContainer1_tpBase_txtDiseaseSituation" not found.');
        }
    }
    function autoInsertPhones(rootEl, chatRecordText) {
        const phones = (0, common_1.withinPhoneByContent)(chatRecordText);
        if (phones && phones.length > 0) {
            const element = rootEl.getElementById("TabContainer1_tpBase_txtMobilePhoneFirst");
            element.value = phones[0];
            if (phones.length > 1) {
                const element1 = rootEl.getElementById("TabContainer1$tpBase$txtMobilePhoneSecond");
                element1.value = phones[1];
            }
        }
    }
    function autoInsertRealName(rootEl, chatRecordText) {
        const names = (0, common_1.withinRealNameByContent)(chatRecordText);
        if (names && names.length > 0) {
            const element = rootEl.getElementById("TabContainer1_tpBase_txtName");
            element.value = names[0];
        }
    }
    function autoInsertCreateDate(rootEl, chatRecordText, isRobot) {
        let date = (0, utils_3.formatDate)("yyyy-MM-dd hh:mm:ss", new Date());
        if (!isRobot) {
            const regex = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s+(0[0-9]|1[0-9]|2[0-3]):([0-5]\d):([0-5]\d)/g;
            let match = regex.exec(chatRecordText);
            if (match) {
                date = match[0];
            }
        }
        const element = rootEl.getElementById("TabContainer1_tpBase_txtVisitTime");
        element.value = date;
    }
    function autoSelectGender(rootEl, chatRecordText) {
        var _a;
        const gender = (0, common_1.withinGenderByContent)(chatRecordText);
        (0, utils_3.forEachElements)((_a = rootEl.getElementById("TabContainer1_tpBase_ddlGender").children) !== null && _a !== void 0 ? _a : [], (element, _, els) => {
            if (element.innerText == gender) {
                (0, utils_3.forEachElements)(els, el => el.removeAttribute("selected"));
                element.setAttribute("selected", "selected");
                return true;
            }
        });
    }
    function autoInsertAge(rooEl, chatRecordText) {
        rooEl.getElementById("TabContainer1_tpBase_txtAge").value = (0, common_1.withinAgeByContent)(chatRecordText);
    }
    function autoInsertAddress(rootEl, chatRecordText) {
        const [pro, city] = (0, common_1.withinAddressContent)(chatRecordText);
        rootEl.getElementsByName("TabContainer1$tpBase$ssProvince$rblCheck").forEach((element) => {
            if (element.value == pro.key) {
                element.click();
                return;
            }
        });
        setTimeout(function () {
            rootEl.getElementById("TabContainer1_tpBase_txtAddress").value = city;
        }, 600);
    }
});
define("core/view/draggable-button", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.draggableButton = draggableButton;
    function draggableButton({ onDblClick } = {}) {
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
define("app", ["require", "exports", "core/element", "lib/utils", "core/common", "core/view/draggable-button"], function (require, exports, element_1, utils_4, common_2, draggable_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = exports.isInit = void 0;
    exports.init = init;
    function controller(rootEl, chatRecordText, isRobot = false) {
        rootEl.getElementById("TabContainer1_tpBase_txtMobilePhoneFirst").blur();
        (0, element_1.autoSelectedDeviceType)(rootEl);
        (0, element_1.autoSelectedSourceType)(rootEl, chatRecordText);
        (0, element_1.autoInsertCreateDate)(rootEl, chatRecordText, isRobot);
        (0, element_1.autoInsertSwtId)(rootEl, chatRecordText);
        (0, element_1.autoInsertAddress)(rootEl, chatRecordText);
        (0, element_1.autoInsertKeywords)(rootEl, chatRecordText, isRobot);
        const message = (0, element_1.autoInsertPatientInformation)(rootEl, chatRecordText, isRobot);
        (0, element_1.autoInsertPhones)(rootEl, message);
        (0, element_1.autoInsertRealName)(rootEl, message);
        (0, element_1.autoSelectGender)(rootEl, message);
        (0, element_1.autoInsertAge)(rootEl, message);
    }
    function main() {
        try {
            const rootElement = (0, element_1.getRootElement)();
            const chatRecordElement = (0, element_1.getChatRecordElement)(rootElement);
            if (chatRecordElement == null || (0, utils_4.isBlankString)(chatRecordElement.innerText)) {
                return layer.msg("聊天记录框内没有内容，请检查！");
            }
            if (!(0, common_2.isRobotByChatRecord)(chatRecordElement)) {
                (0, element_1.formatChatRecord)(rootElement, chatRecordElement);
                return controller(rootElement, chatRecordElement.outerHTML);
            }
            return controller(rootElement, chatRecordElement.outerHTML, true);
        }
        catch (e) {
            console.error(e);
            window.layer.msg("请确认当前页面是否为添加患者页面!");
        }
    }
    exports.isInit = false;
    function init({ callback } = {}) {
        if (exports.isInit)
            return;
        (0, draggable_button_1.draggableButton)({
            onDblClick() {
                main();
            }
        });
        callback && callback();
        exports.isInit = true;
    }
    exports.version = 'v3.2.1';
});
