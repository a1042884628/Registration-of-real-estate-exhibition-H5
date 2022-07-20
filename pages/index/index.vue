<template>
	<view class="content">
		<view class="title">
			<view>
				<view style="font-size: 36px;font-weight: bold;">《2022济宁夏季</view>
				<view style="font-size: 36px;font-weight: bold;">房产交易会》展</view>
				<view style="font-size: 36px;font-weight: bold;">位在线预订</view>
			</view>
			<view style="margin-top: 25px;">
				<view>
					<view>
						<img src="../../static/rili.png" alt="">
						<text style="margin: 0 5px">时间</text>
						<text>2022-07-15 18:00 ~ 07-17 21:00 </text>
					</view>

					<view style="margin-top: 6px;">
						<img src="../../static/dizhi.png" alt="">
						<text style="margin: 0 5px;">地址</text>
						<text>山东济宁市文化广场</text>
					</view>
				</view>
			</view>

			<view style="margin-top: 26px;"><text>活动由 <text
						style="font-size: 17px;margin: 0 5px;font-weight: 550;">济宁市房地产业协会</text> 主办</text></view>
			<view class="btn1" @click="btn1()">
				<text>立即报名</text>
				<!-- <text><a href="#maodian" style="color: #fff;">立即报名</a></text> -->
			</view>
		</view>
		<view class="lang">
			<img src="../../static/wenjian.png" alt="">
			<text>活动详情</text>
		</view>
		<view style="margin: 0;padding: 0;border: none;" @click="previewImg(item.imgUrl,index)" v-for="(item,index) in imgList" :key="index">
			<image class="img" :src="item.imgUrl" mode="widthFix"></image>
		</view>
		<view class="info" id="maodian">
			<view class="info_title">
				参会者信息
			</view>
			<view class="info_body">
				<view>公司名称<text style="color: red;">*</text></view>
				<input type="text" v-model="company_name">
			</view>
			<view class="info_body">
				<view>项目名称<text style="color: red;">*</text></view>
				<input type="text" v-model="project_name">
			</view>
			<view class="info_body">
				<view>姓名<text style="color: red;">*</text></view>
				<input type="text" v-model="real_name">
			</view>
			<view class="info_body">
				<view>邮箱</view><!-- <text style="color: red;">*</text> -->
				<input type="text" v-model="email">
			</view>
			<view class="info_body">
				<view>职位<text style="color: red;">*</text></view>
				<input type="text" v-model="job">
			</view>
			<view class="info_body">
				<view>手机号<text style="color: red;">*</text></view>
				<input type="text" v-model="telephone">
			</view>
			<view class="info_body">
				<view>在线选展位<text style="color: red;">*</text></view>
				<!-- <view style="width: 100%;">
					<uni-data-checkbox multiple @change="change" v-model="abc" :localdata="areaList" mode="button" />
				</view> -->
				
				<checkbox-group @change="checkboxChange" style="width: 100%;">
					<label class="checkbox" v-for="item in areaList" :key="item.value" style="width: 50%;">
						<checkbox :value="item.name" :checked="item.checked==1?true:false"
							:disabled="item.status==1" />
						<view>{{item.name}}</view>
						<view v-show="item.selected" style="color: blue;margin-left: 10px;">已选择</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="btn2" :style="{backgroundColor:(m.length==0?noAdd:everAdd)}">
			<text v-show="m.length==0" @click="btn()">提交报名</text>
			<text v-show="m.length!=0">您已选择,</text>
			<text v-for="(item,index) in m">{{item}} <text v-show="index!=(m.length-1)">,</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				company_name: '',
				project_name: '',
				real_name: '',
				email: '',
				job: '',
				telephone: '',
				telephoneTemp: '',
				areaList: [],
				cont: '',
				m: '',
				abc:[],
				noAdd: '#2241F2',
				everAdd: '#808080',
				imgList: [
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_01.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_02.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_03.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_04.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_05_1.png")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_06.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_07.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_08.jpg")
					},
					{
						imgUrl: require("../../static/2022济宁夏季房产交易会长图_09.jpg")
					},
				],
				extraImg:require("../../static/2022济宁夏季房产交易会长图_000.jpg"),
			}
		},
		onLoad() {
			this.telephone = uni.getStorageSync('telephone')
			this.loadAreaList();

		},
		methods: {
			previewImg(logourl,index) {
					console.log('logourl',logourl)
					console.log('index',index)
					if(index==4){
						let _this = this;
						let imgsArray = [];
						imgsArray[0] = this.extraImg;
						uni.previewImage({
							current: 0,
							urls: imgsArray
						});
					}
					
			},
			change(e){
				console.log('change e',e)
				console.log('change abc',this.abc)
			},
			loadAreaList() {
				this.$api.task.position_arealist({}).then(resData => {
					// this.areaList = resData.data;
					for (var i =0;i<resData.data.length;i++) {
						resData.data[i].text = resData.data[i].name
						if(resData.data[i].status==1){
							resData.data[i].disable=true;
						}
						this.areaList.push(resData.data[i])
					}
					console.log('this.areaList',this.areaList);
					this.loadData();
				}).catch(function(err) {
					console.log(err);
				});
			},
			async loadData() {
				await this.$api.task.position_orderview({
					telephone: this.telephone,
				}).then(resData => {
					console.log(' resData', resData);
					this.company_name = resData.data.company_name;
					this.project_name = resData.data.project_name;
					this.real_name = resData.data.real_name;
					this.email = resData.data.email;
					this.job = resData.data.job;
					this.telephone = resData.data.telephone;
					if (resData.data.cont != ''&&resData.data != '') {
						/* 如果已提交,显示已选择 */
						console.log()
						var m = resData.data.cont.split(",");
						this.m = m;
						console.log('m', m)
						for (var i = 0; i < m.length; i++) {
							console.log('m[i]', m[i])
							for (var j = 0; j < this.areaList.length; j++) {
								if (m[i] == this.areaList[j].name) {
									this.areaList[j].selected = true;
								}
							}
						}
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			btn1(){
				uni.pageScrollTo({
					// selector:'#maod	ian',
					// selector:'.lang',
					scrollTop: 3370,
					duration: 300
				});
			},
			btn() {

				if (this.company_name == "") {
					this.$prompt.showMsg("请填写公司名称");
					return;
				}
				if (this.project_name == "") {
					this.$prompt.showMsg("请填写项目名称");
					return;
				}
				if (this.real_name == "") {
					this.$prompt.showMsg("请填写姓名");
					return;
				}
				// if(this.email==""){
				// 	this.$prompt.showMsg("请填写邮箱");
				// 	return;
				// }
				if (this.job == "") {
					this.$prompt.showMsg("请填写职位");
					return;
				}
				if (this.telephone == "") {
					this.$prompt.showMsg("请填写手机号");
					return;
				}
				if (this.telephone.length != 11) {
					this.$prompt.showMsg("请填写正确手机号");
					return;
				}
				if (this.cont.length == 0) {
					this.$prompt.showMsg("请选择展位");
					return;
				}
				var that = this;
				// var content1 = '姓名:'+this.real_name;
				var content2 = '您的手机号:' + this.telephone;
				var content3 = '您选择的展位:' + this.cont; /* .slice(0,-1) */
				var content = content3 + content2;
				uni.showModal({
					title: '信息确认',
					content: content,
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确定", // 确认按钮文字 
					confirmColor: '#F54E40', //确认字体的颜色
					cancelColor: '#000', //取消字体的颜色
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if(that.email == undefined){
								that.email=''
							}
							that.$api.task.position_orderedit({
								company_name: that.company_name,
								project_name: that.project_name,
								real_name: that.real_name,
								email: that.email,
								job: that.job,
								telephone: that.telephone,
								cont: that.cont,
							}).then(resData => {
								if (resData.statecode == 0) {
									uni.setStorage({
										key: 'telephone',
										data: that.telephone,
										success: function() {
											console.log('success');
										}
									});
									uni.showToast({
										title: '提交成功',
										duration: 3000 //单位毫秒
									});
									setTimeout(function() {
										location.reload();
									}, 3000)
								}
							}).catch(function(err) {
								console.log(err);
								this.$prompt.showMsg(err);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			checkboxChange: function(e) {
				// console.log('e',e)
				// var items = this.areaList,
				this.cont = '';
				var cont = e.detail.value;
				console.log('e', e.detail.value)
				for (let i = 0; i < cont.length; i++) {
					this.cont += cont[i] + ','
				}
				console.log('this.cont', this.cont)
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	const item = items[i]
				// 	if(values.includes(item.value)){
				// 		this.$set(item,'checked',true)
				// 		console.log('this.areaList',this.areaList)
				// 	}else{
				// 		this.$set(item,'checked',false)
				// 	}
				// }
			}

		}
	}
</script>

<style>
	.content {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.everAdd {
		background-color: gray;
	}

	.title {
		width: 100%;
		height: 100%;
		padding: 120px 6px;
		background-image: url(../../static/bg002_local.jpg);
		background-position: 55%;
		background-size: cover;
		background-repeat: no-repeat;
		background-size: 260% 105%;
		text-align: center;
		color: #fff;


	}

	.btn1 {
		width: 40%;
		margin: 0 auto;
		margin-top: 46px;
		padding: 12px 0;
		border: rgb(225, 224, 226) 2px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 550;
	}

	.lang {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-top: 30px;
		margin-bottom: 35px;
	}

	.lang text {
		margin-left: 5px;
		font-size: 25px;
	}

	.img {
		padding: 0;
		margin: 0;
		width: 100%;
		display: block;
	}

	.info {
		width: 100%;
		padding: 2%;
		padding-bottom: 60px;
	}

	.info_title {
		font-size: 20px;
		font-weight: bold;
		width: 100%;
		padding-bottom: 10px;
		margin-bottom: 20px;
		border-bottom: rgb(224, 224, 224) 1px solid;
	}

	.info_body text {
		margin-left: 5px;
	}

	.info_body input {
		width: 95%;
		margin-top: 5px;
		margin-bottom: 15px;
		height: 35px;
		border: rgb(214, 215, 219) 1px solid;
		background-color: rgb(244, 245, 249);
	}

	.checkbox {
		width: 50%;
		height: 30px;
		margin-top: 8px;
		padding: 5px 5px 0 5px;
		display: flex;
		transform:scale(1)
	}

	.btn2 {
		position: fixed;
		bottom: 0;
		width: 100%;
		margin: 0 auto;
		background-color: rgb(34, 65, 242);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		padding: 15px 0;
		/* margin-bottom: 40px; */
	}

	.btn2 text {
		/* background-color: pink; */
		font-size: 18px;
	}
</style>
