export const langZh = {
    common: {
        vote: '投票',
        withdrawalVotes: '撤票',
        candidateNode: '候选节点',
        numberVotes: '投票数',
        withdrawalVotesNum: '撤回票数',
        balance: '余额',
        numberVotesCast: '已投票数',
        cancel: '取消',
        votedNode: '已投节点',

        votesAvailableNum: '可投票数',
        
        sellOut: '卖 出',
        discard: '丢 弃',
        registerCreator: '注册开发者',
        createViewWorld: '创建世界观',
        createAsset: '创建新资产',
        goback: '返 回',
        confirm: '确认',
        removebtn: '删 除',
        addbtn: '添 加',
        immediatePurchaseBtn: '立即购买',
        cancellationOfOrderBtn: '取消订单',


        total: '总计',
        choice: '选择',

        ShowMore: '显示更多',

        remainingAvailableVotes: '剩余可用票数',

        max: '最大',
        '7': '不活跃BP',
        yes: '是',
        no: '否'
        
    },
    installTips: {
        installed: '请确认您已安装'
    },
    nodeContainer: {
        voteForNode: '投票给节点',
        selectedNode: '已选节点',
    },
    tabTableContainer: {
        // superNode: '超级节点',
        superNode: '活跃 BP',
        council: '理事会',
        ranking: '排名',
        country: '国家/地区',
        voteRate: '得票率',
        getVoteNum: '得票数',
        numberVotingAccounts: '投票账户数',
        awardsClaimed: '待申领奖励(COCOS)',
        isActive: '是否活跃',
        voteNum: '已投票数',

        name: '名称',
        blockNum: '已生产区块数'
    },
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
            '4': '网络繁忙或账号不匹配',
            '5': '网络繁忙',
            '6': '密码错误'
        },
        publishVotes:{
            '1': '请导入账户私钥（owner）'
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
    
    
    tipsMessage: {
        common: {
            notInputRepeat: '请勿重复输入',
            firstCreateWorldView: '需要创建世界观',
            notEmpty: '不能为空',
            accountLocked: '请先解锁账户',
            linkFailure: '链接失败，请检查浏览器钱包是否正常打开',

            pleaseEnter: '请输入'
        },
        business: {
            pleaseEnterNode: '请输入节点名称',
            noData: '暂无数据',

            votesExceededAvailableBalance: '投票数超过可使用余额',
            votesWithdrawnExceedsNumber: '撤票数超过已投票数',
            votedSuccessfully: '投票成功',
            votedFailed: '投票失败',
            maximumNumberVotesReached: '已到达票数上限',
            votesCannotZero: '票数不能为零',
            pleaseSelectNode: '请选择节点',
            pleaseImportAccountPrivateKey: '请导入账户私钥（owner）',
            pleaseImportAssetPrivateKey: '请导入资产私钥（active）',
            lockedGreaterThanValue: '资源不足以支撑本次操作，请抵押GAS或预留COCOS',

            moreVotesThanAvailable: '投票数超过可用票数',
            cannotExceedNumberVotes: '不能超过已投票数',
            successfulWithdrawalTickets: '撤票成功'
        }
    }

}

