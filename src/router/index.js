import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home' // 主页面
import login from '@/components/login' // 登录页面


// 修理厂收款结算
import XiuLiChangShouKuanJieSuan from '@/components/CaiWuZhongXin/CaiWuBaoBiao/XiuLiChangShouKuanJieSuan'
import XiuLiChangShouKuanJieSuanMingXi from '@/components/CaiWuZhongXin/CaiWuBaoBiao/XiuLiChangShouKuanJieSuanMingXi'
import XiuLiChangShouKuanJieSuanXiangDan from '@/components/CaiWuZhongXin/CaiWuBaoBiao/XiuLiChangShouKuanJieSuanXiangDan'
// 修理厂返佣结算
import XiuLiChangFanYongJieSuan from '@/components/CaiWuZhongXin/CaiWuBaoBiao/XiuLiChangFanYongJieSuan'
import XiuLiChangAnZhuangJieSuanMingXi from '@/components/CaiWuZhongXin/CaiWuBaoBiao/XiuLiChangAnZhuangJieSuanMingXi'
// 商城订单结算
import ShangChengDingDanJieSuan from '@/components/CaiWuZhongXin/CaiWuBaoBiao/ShangChengDingDanJieSuan'
// 合伙人佣金结算
import HeHuoRenYongJinJieSuan from '@/components/CaiWuZhongXin/CaiWuBaoBiao/HeHuoRenYongJinJieSuan'
import HeHuoRenYongJinJieSuanXiangQing from '@/components/CaiWuZhongXin/CaiWuBaoBiao/HeHuoRenYongJinJieSuanXiangQing'

// 商品对账
import ShangPinDuiZhang from '@/components/CaiWuZhongXin/DuiZhangGuanLi/ShangPinDuiZhang'
// 运费对账
import YunFeiDuiZhang from '@/components/CaiWuZhongXin/DuiZhangGuanLi/YunFeiDuiZhang'
// 对账单
import WeiXiuFuKuanJiLu from '@/components/CaiWuZhongXin/DuiZhangDan/WeiXiuFuKuanJiLu'
import DingDanFuKuanJiLu from '@/components/CaiWuZhongXin/DuiZhangDan/DingDanFuKuanJiLu'
// 提现管理
import HeHuoRenTiXian from '@/components/CaiWuZhongXin/TiXianGuanLi/HeHuoRenTiXian' // 合伙人提现
import XiuLiChangTiXian from '@/components/CaiWuZhongXin/TiXianGuanLi/XiuLiChangTiXian' // 合伙人提现
import JiaYouZhanTiXian from '@/components/CaiWuZhongXin/TiXianGuanLi/JiaYouZhanTiXian' // 加油站提现


// 统计模块
import YongHuZengZhang from '@/components/TongJiBaoBiao/YongHuZengZhang' // 用户新增
import YongHuShuXing from '@/components/TongJiBaoBiao/YongHuShuXing' // 用户属性
import fuKuanBiShu from '@/components/TongJiBaoBiao/fuKuanBiShu' // 付款笔数
import YongHuLiuLiang from '@/components/TongJiBaoBiao/YongHuLiuLiang' // 用户流量

// 订单管理
import DingDanLieBiao from '@/components/DingDanGuanLi/DingDanLieBiao' // 订单列表
import DingDanXiangQing from '@/components/DingDanGuanLi/DingDanXiangQing' // 订单详情
import DingDanPiLiaoFaHuo from '@/components/DingDanGuanLi/DingDanPiLiaoFaHuo' // 订单批量发货
import DingDanSheZhi from '@/components/DingDanGuanLi/DingDanSheZhi' // 订单设置
import tuiHuanHuoShenQingChuLi from '@/components/DingDanGuanLi/tuiHuanHuoShenQingChuLi' // 退换货申请处理
import tuiHuanHuoXiangQing from '@/components/DingDanGuanLi/tuiHuanHuoXiangQing' // 退还货详情
import tuiHuanHuoYuanYin from '@/components/DingDanGuanLi/tuiHuanHuoYuanYin' // 退还货原因设置
import dingDanGenZong from '@/components/DingDanGuanLi/dingDanGenZong' // 退还货原因设置

// 加油业务管理
import JiaYouQuanLieBiao from '@/components/JiaYouGuanLi/JiaYouQuanGuanLi' //加油券列表
import JiaYouQuanDingDan from '@/components/JiaYouGuanLi/JiaYouQuanDingDan' // 加油券订单
import JiaYouQuanHeXiao from '@/components/JiaYouGuanLi/JiaYouQuanHeXiao' // 加油券核销
import JiaYouKaLieBiao from '@/components/JiaYouGuanLi/JiaYouKaLieBiao' // 加油卡列表
import ChongZhiGuanLi from '@/components/JiaYouGuanLi/ChongZhiGuanLi' // 充值管理
import ChongZhiJiLu from '@/components/JiaYouGuanLi/ChongZhiJiLu' // 充值记录
import KaiTongChengShi from '@/components/JiaYouGuanLi/KaiTongChengShi' // 加油卡开通城市



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' // 默认登录页面
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        // 对账单
        {
          path: '/WeiXiuFuKuanJiLu',
          name: 'WeiXiuFuKuanJiLu',
          component: WeiXiuFuKuanJiLu
        },
        {
          path: '/DingDanFuKuanJiLu',
          name: 'DingDanFuKuanJiLu',
          component: DingDanFuKuanJiLu
        },
        // 财务报表
        {
          path: '/XiuLiChangShouKuanJieSuan', // 修理厂收款结算
          name: 'XiuLiChangShouKuanJieSuan',
          component: XiuLiChangShouKuanJieSuan
        },
        {
          path: '/XiuLiChangShouKuanJieSuanMingXi', // 修理厂收款结算查看 
          name: 'XiuLiChangShouKuanJieSuanMingXi',
          component: XiuLiChangShouKuanJieSuanMingXi
        },
        {
          path: '/XiuLiChangShouKuanJieSuanXiangDan',
          name: 'XiuLiChangShouKuanJieSuanXiangDan',
          component: XiuLiChangShouKuanJieSuanXiangDan
        },
        {
          path: '/XiuLiChangFanYongJieSuan', // 修理厂返佣结算
          name: 'XiuLiChangFanYongJieSuan',
          component: XiuLiChangFanYongJieSuan
        },
        {
          path: '/XiuLiChangAnZhuangJieSuanMingXi',
          name: 'XiuLiChangAnZhuangJieSuanMingXi',
          component: XiuLiChangAnZhuangJieSuanMingXi
        },
        {
          path: '/ShangChengDingDanJieSuan', // 商城订单结算
          name: 'ShangChengDingDanJieSuan',
          component: ShangChengDingDanJieSuan
        },
        {
          path: '/HeHuoRenYongJinJieSuan', // 合伙人佣金结算
          name: 'HeHuoRenYongJinJieSuan',
          component: HeHuoRenYongJinJieSuan
        },
        {
          path: '/HeHuoRenYongJinJieSuanXiangQing',
          name: 'HeHuoRenYongJinJieSuanXiangQing',
          component: HeHuoRenYongJinJieSuanXiangQing
        },
        // 提现管理
        {
          path: '/HeHuoRenTiXian', // 提现管理
          name: 'HeHuoRenTiXian',
          component: HeHuoRenTiXian
        },
        {
          path: '/XiuLiChangTiXian',
          name: 'XiuLiChangTiXian',
          component: XiuLiChangTiXian
        },
        // 订单对账
        {
          path: '/ShangPinDuiZhang', // 商品对账
          name: 'ShangPinDuiZhang',
          component: ShangPinDuiZhang
        },
        {
          path: '/YunFeiDuiZhang', // 运费对账
          name: 'YunFeiDuiZhang',
          component: YunFeiDuiZhang
        },
        // 统计模块
        {
          path: '/YongHuZengZhang', // 用户增长
          name: 'YongHuZengZhang',
          component: YongHuZengZhang
        },
        {
          path: '/YongHuShuXing',
          name: 'YongHuShuXing',
          component: YongHuShuXing
        },
        {
          path: '/YongHuLiuLiang',//用户流量
          name: 'YongHuLiuLiang',
          component: YongHuLiuLiang
        },
        {
          path: '/fuKuanBiShu', // 付款笔数
          name: 'fuKuanBiShu',
          component: fuKuanBiShu
        },
        // 订单管理
        {
          path: '/DingDanLieBiao', // 订单列表
          name: 'DingDanLieBiao',
          component: DingDanLieBiao
        },
        {
          path: '/DingDanXiangQing', // 订单详情
          name: 'DingDanXiangQing',
          component: DingDanXiangQing
        },
        {
          path: '/DingDanPiLiaoFaHuo', // 订单批量发货
          name: 'DingDanPiLiaoFaHuo',
          component: DingDanPiLiaoFaHuo
        },
        {
          path: '/dingDanGenZong',
          name: 'dingDanGenZong',
          component: dingDanGenZong
        },
        {
          path: '/DingDanSheZhi', // 订单设置
          name: 'DingDanSheZhi',
          component: DingDanSheZhi
        },
        {
          path: '/tuiHuanHuoShenQingChuLi', // 退换货申请处理
          name: 'tuiHuanHuoShenQingChuLi',
          component: tuiHuanHuoShenQingChuLi
        },
        {
          path: '/tuiHuanHuoXiangQing', // 退换货详情
          name: 'tuiHuanHuoXiangQing',
          component: tuiHuanHuoXiangQing
        },
        {
          path: '/tuiHuanHuoYuanYin', // 退换货原因设置
          name: 'tuiHuanHuoYuanYin',
          component: tuiHuanHuoYuanYin
        },
        {
          path: '/JiaYouQuanLieBiao', // 加油券列表
          name: 'JiaYouQuanLieBiao',
          component: JiaYouQuanLieBiao
        },
        {
          path: '/JiaYouQuanDingDan', // 加油券订单
          name: 'JiaYouQuanDingDan',
          component: JiaYouQuanDingDan
        },
        {
          path: '/JiaYouQuanHeXiao', // 加油券核销
          name: 'JiaYouQuanHeXiao',
          component: JiaYouQuanHeXiao
        },
        {
          path: '/JiaYouKaLieBiao', // 加油卡列表
          name: 'JiaYouKaLieBiao',
          component: JiaYouKaLieBiao
        },
        {
          path: '/ChongZhiGuanLi', // 充值管理
          name: 'ChongZhiGuanLi',
          component: ChongZhiGuanLi
        },
        {
          path: '/ChongZhiJiLu', // 充值记录
          name: 'ChongZhiJiLu',
          component: ChongZhiJiLu
        },
        {
          path: '/KaiTongChengShi', // 加油卡开通城市
          name: 'KaiTongChengShi',
          component: KaiTongChengShi
        },
        {
          path: '/JiaYouZhanTiXian', // 加油卡提现
          name: 'JiaYouZhanTiXian',
          component: JiaYouZhanTiXian
        },

      ]
    }
  ]
})
