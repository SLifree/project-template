<template>
  <div class="down-file">
    <h1 @click="downExcel">前端自定义Excel导出</h1>

    <input type="text" placeholder="请输入导出文件名称" v-model="name" />
    <input type="text" placeholder="请输出导出文件格式" v-model="format" />
    <h1 @click="bufferToFile">前端buffer转文件</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "export",
      format: "csv",
    };
  },
  methods: {
    downExcel() {
      const list = [
        { name: "test", value: 1 },
        { name: "test2", value: 2 },
        { name: "test3", value: 3 },
      ];
      const tHeader = ["名称", "数值"];
      const filterVal = ["name", "value"];
      this.handleDownExcel(list, tHeader, filterVal);
    },
    handleDownExcel(list, tHeader, filterVal) {
      // 导出数据
      this.list = list;
      // 表头数据
      this.tHeader = tHeader;
      // 表头数据对应名字
      this.filterVal = filterVal;
      // 数据方法
      this.formatJson = function (filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]));
      };

      // 导出文件的方法
      this.export2Excel = function () {
        require.ensure([], () => {
          const {
            export_json_to_excel,
          } = require("../assets/lib/Export2Excel");
          const tHeader = this.tHeader;
          const filterVal = this.filterVal;
          const list = this.list;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "Excel导出表");
        });
      };
      this.export2Excel();
    },
    bufferToFile() {
      const buffer =
        `姓名,年龄,身高,籍贯
        张三,22,180,安徽`;
      this.downFile(buffer, this.name, this.format);
    },
    downFile(data, name, format) {
      const blob = new Blob([data]);
      const blobUrl = window.URL.createObjectURL(blob); //生成虚拟url
      const a = document.createElement("a");
      a.download = (name || "export") + "." + (format || "csv");
      a.href = blobUrl;
      a.click();
      window.URL.revokeObjectURL(blobUrl); //释放虚拟url
    },
  },
};
</script>

<style lang="less" scoped>
.down-file {
  text-align: center;
  cursor: pointer;
  h1 {
    line-height: 200px;
  }
  input {
    margin-top: 100px;
  }
}
</style>