<template>
  <div class="Editress">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      id="addTop"
      :title="core"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>

    <div class="Editress-wrap">
      <van-address-edit
        class="Editress-edit"
        :area-list="areaList"
        :show-delete="boo"
        show-set-default
        show-search-result
        tel-maxlength="11"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      >
        <template>
          <div class="tagtop">
            <span>地址标签</span>
            <span>
              <van-tag
                :plain="item.boo"
                :color="item.color"
                @click="item.boo=!item.boo"
                v-for="(item, index) in lsittag"
                :key="index"
                >{{ item.name }}</van-tag
              >
            </span>
          </div>
        </template>
      </van-address-edit>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
          // ....
        },
      },
      searchResult: [],
      lsittag: [
        {
          name: "家",
          boo: true,
          color: "#00CC66",
        },
        {
          name: "公司",
          boo: true,
          color: "#1989FA",
        },
        {
          name: "其他",
          boo: true,
          color: "#666666",
        },
      ],
      core:this.$route.query.num=='10'?'添加收货地址':'编辑收货地址',
      boo:this.$route.query.num=='10'?false:true,
    };
  },
  created(){
    console.log(this.core)
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Receive",
      });
    },
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Editress {
  width: 100%;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;

  #addTop {
    background: #f3f3f3;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    width: 100%;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: none;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    i {
      color: #333;
    }
    span {
      font-size: 16px;
      &:nth-of-type(1) {
        margin-left: 20px;
      }
    }
    .sp-right {
      color: #999;
    }
  }
  .Editress-wrap {
    width: 100%;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    .Editress-edit {
      .tagtop {
        padding: 10px 16px 10px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-style: normal;
          }
          &:nth-of-type(2) {
            display: flex;
            span {
              margin: 0 5px 0 5px;
              padding: 5px 10px 5px 10px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>