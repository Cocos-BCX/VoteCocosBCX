export const langZh = {
    interFaceMessage: {
        common: {
            'success': '成功',
            '1': '创建成功',
            '0': '网络繁忙，请检查你的网络连接',
            '-11': '账户锁定或未登录',
            '114': '账户锁定或未登录',
            '101': '缺少参数',
            '2': '你不是资产拥有者',
            'InsufficientBalance': '余额不足',
            '3': '账号不匹配',
            '4': '网络繁忙或账号不匹配'
        },
        creatNHAssetOrder: {
            '1': '挂单成功',
            '2': '订单过期'
        },
        deleteNHAsset: {
            '1': '删除成功',
            // 10-15
            '2': '删除失败',
            '3': '你不是资产拥有者，所以不能删除该资产'
        },
        fillNHAssetOrder: {
            '1': '购买成功',
            'orderhasexpired': '订单已失效',
            'InsufficientBalance': '余额不足',
            'selforder': '不能购买自己创建的订单',
        },
        cancelNHAssetOrder: {
            '1': '取消成功',
            '0': '订单已失效'
        },
        creatWorldView: {
            '0': '世界观已存在',
            '2': '请先注册开发者',
            '131': '世界观不能为空',
            '3': '不能以数字开头',
        },
        registerCreator: {
            '1': '注册成功',
            '0': '您已经注册过了',
            // 10-16
            '2': '注册失败'
        }
    },
    
    // 10-10 
    myAssets: {
        title: '我的资产',
        createAssetsBtn: '创建新资产',
        myAssetsTable: {
            tableHead: ['缩略图', 'NH资产ID', '通行资产', '世界观', '基础数据', '操作']
        },
        createFirstAsset: {
            title: '试试创建你的第一笔资产吧'
        },
        step: [
            {
                key: '步骤1. ',
                value: '注册成为开发者'
            },
            {
                key: '步骤2. ',
                value: '创建一个世界观'
            },
            {
                key: '步骤3. ',
                value: '开始创建你的资产吧'
            }
        ]
    },
    common: {
        sellOut: '卖 出',
        discard: '丢 弃',
        registerCreator: '注册开发者',
        createViewWorld: '创建世界观',
        createAsset: '创建新资产',
        goback: '返 回',
        confirm: '确 认',
        removebtn: '删 除',
        addbtn: '添 加',
        immediatePurchaseBtn: '立即购买',
        cancellationOfOrderBtn: '取消订单'
    },
    sellOutAssets: {
        title: '填写交易信息',
        price: '价格',
        expiration: '过期时间',
        expirationUnit: '秒',
        memo: '备注',
        // 10-15
        expirationPlaceholder: '最大1209500',
    },

    creatWorldView: {
        title: '填写交易信息',
        worldViewName: '世界观名'
    },
    
    createassets: [
        {
            key: '类别名称',
            placeholder: '如“炸弹”'
        },
        {
            key: '生产数量',
            placeholder: '如“1”'
        },
        {
            key: '通行资产',
            placeholder: '如“COCOS”'
        },
        {
            key: '世界观',
            placeholder: '请选择'
        },
        {
            key: '缩略图',
            placeholder: '选择文件'
        },
        {
            key: '基础数据'
        }
    ],
    tradingMarket: {
        title: '交易市场',
        price: '价格',
        seller: '卖家',
        memo: '备注',
    },
    
    tipsMessage: {
        common: {
            notInputRepeat: '请勿重复输入',
            firstCreateWorldView: '需要创建世界观',

            // 10-16
            notEmpty: '不能为空',
            accountLocked: '请先解锁账户',
            linkFailure: '链接失败，请检查浏览器钱包是否正常打开'
        }
    }

}

