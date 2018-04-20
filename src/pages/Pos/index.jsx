import React, { PureComponent } from 'react';
import {Layout, Table, Button, Message} from 'element-react'
import {getData} from '../../fetch/fetchData'
import './style.css'

class Pos extends PureComponent {
  constructor(props) {
    super(props);
    this.delSingleGoods = this.delSingleGoods.bind(this);
    this.addOrderList = this.addOrderList.bind(this);

    this.state = {
      columns: [
        {
          label: "商品名称",
          prop: "goodsName",
          width: 125,
          resizable:false,
          headerAlign: "center"
        },
        {
          label: "数量",
          prop: "count",
          width: 75,
          resizable:false,          
          headerAlign: "center"
        },
        {
          label: "价格",
          prop: "price",
          width: 75,
          resizable:false,          
          headerAlign: "center"          
        },
        {
          label: "操作",
          prop: "goodsId",
          fixed: 'right',
          resizable:false,          
          width: 100,
          render: (row,column,index)=>{
            return <span><Button type="text" size="small" onClick={() => {this.delSingleGoods(row,column,index)}}>删除</Button>
            <Button type="text" size="small" onClick={() => {this.addOrderList(row,column,index)}}>增加</Button></span>
          }
        }
      ],
      OftenGoodsList: [],
      tableData: [],
      totalCount:0,
      totalMoney:0
    }
  }

  componentWillMount() {
    this.getOftenGoods()
  }

  delSingleGoods (row,column,index) {
    console.log(row)
    console.log(column)
    console.log(index)
    let newData = []
    if (row.count === 1) {
      newData = this.state.tableData.filter((o,i) => { return i !== index})
    } else {
      // newData = this.state.tableData;      
      // let arrIndex = this.state.tableData.findIndex(o => o.goodsId === row.goodsId)
      // newData[arrIndex].count--; 
      newData = this.state.tableData.map((o,i) => {
        if (i === index) {
          o.count--
        }
        return o
      })
    }
    this.setState({tableData: newData},() => {this.countSummary()})
  }
  //添加订单列表的方法
  addOrderList(goods) {
    console.log(goods)
    let tempTableData = this.state.tableData;
    let isHave = false;
    //判断是否这个商品已经存在于订单列表
    for (let i = 0; i < this.state.tableData.length; i++) {
      console.log(this.state.tableData[i].goodsId);
      if (this.state.tableData[i].goodsId === goods.goodsId) {
        isHave = true; //存在
      }
    }
    //根据isHave的值判断订单列表中是否已经有此商品
    if (isHave) {
      //存在就进行数量添加
      let arrIndex = this.state.tableData.findIndex(o => o.goodsId === goods.goodsId);
      tempTableData[arrIndex].count++;
    } else {
      //不存在就推入数组
      let newGoods = { goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1 };
      tempTableData.push(newGoods)
    }
    this.setState({
      tableData: tempTableData
    },() => {this.countSummary()})
  }
  countSummary() {
    let totalCount = 0; //汇总数量清0
    let totalMoney = 0;
    this.state.tableData.forEach((element) => {
      totalCount += element.count;
      totalMoney = totalMoney + (element.price * element.count);
    });
    this.setState({
      totalCount:totalCount,
      totalMoney:totalMoney
    })
  }
  delAllGoods() {
    this.setState({tableData:[]},() => {this.countSummary()})
  }
  payBill() {
    if (this.state.tableData.length === 0) {
      return false
    }
    Message({
      message: '买单完成!',
      type: 'success',
      duration: 2000
    })
    this.delAllGoods()
  }
  getOftenGoods() {
    //http://jspang.com/DemoApi/oftenGoods.php
    //http://jspang.com/DemoApi/typeGoods.php
    let result = getData('http://jspang.com/DemoApi/oftenGoods.php');
    result.then((response) => {
      console.log(response.data)
      this.setState({OftenGoodsList:response.data})
    });
  }  
  render() {
    return (
      <div className="pos">
        <Layout.Row className="pos-content">
          <Layout.Col span="7" className="order-list">
            <Table
              style={{width: '100%'}}
              columns={this.state.columns}
              data={this.state.tableData}
              border={true}
            />
            <div className="totalDiv">
              <small>数量：</small>{this.state.totalCount} &nbsp;
              <small>金额：</small>{this.state.totalMoney}元
            </div>
            <div className="div-btn">
              <Button type="danger" onClick={() => {this.delAllGoods()}}>删除</Button>
              <Button type="info" onClick={() => {this.payBill()}}>买单</Button>
            </div>
          </Layout.Col>
          <Layout.Col span="17">
            <div className="often-goods">
              <div className="title">常用商品</div>
              <div className="often-goods-list">
                <ul>
                    {this.state.OftenGoodsList.map((goods) => {
                      return (
                        <li key={goods.goodsId} onClick={() => {this.addOrderList(goods)}}>
                          <span>{goods.goodsName}</span>
                          <span className="o-price">￥{goods.price}元</span>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}
export default Pos