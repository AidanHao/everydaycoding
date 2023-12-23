// 给banner 接口建立一个接口
//接口 :3000/banner->store ->component

//接口 类java等强类型的接口定义 vuex ts类型检测

//模型接口声明
//数据表的字段
export interface Banner{
    pic:string;
    targetId:number;
    targetType:number;
    typeTitle:string;
    bannerId:number;
}
// 跟vuex 一道，把数据严谨再严谨
// let banner:Banner = {pic:'范家吵架图',targetId}