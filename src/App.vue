<template>
  <div id="app">
    <!--页头-->
    <div class="uk-block uk-block-primary uk-contrast page-header">
      <div class="uk-container-center">
        <h1 class="uk-heading-large">图书
          <small>Vue CRUD示例</small>
        </h1>
      </div>
    </div>
  <!--页头-->
  <!--页面正文-->
  <div class="content">
      <!--工具栏-->
      <div class="uk-grid uk-margin-large-bottom">
        <div class="uk-width-3-4">
          <div class="uk-grid">
              <!--图书统计-->
              <div class="uk-width-1-3">
                <span class="uk-text-large uk-text-muted">共有
                  <span class="uk-text-bold">{{bookFilter.length}}</span>本图书
                </span>
                <span v-if="hasSelection">
                  &nbsp;已选中
                  <span class="uk-text-bold">{{selection.length}}</span>本图书
                </span>
              </div>
              <!--图书统计-->
              <!--搜索框-->
              <div class="uk-width-2-3">
                <div class="uk-form">
                  <div class="uk-form-icon">
                    <i class="uk-icon-search"></i>
                    <input type="search" v-model="terms" class="search-box uk-form-width-large" placeholder="请输入您要筛选的书名"/></div>
                </div>
              </div>
              <!--搜索框-->
        </div>
     </div>
     <div class="uk-width-1-4">
       <div class="uk-float-right">
         <button title="删除已选中的图书" class="uk-button uk-button-danger uk-icon-trash" v-if="hasSelection">
         </button>
         <button title="添加图书" class="uk-button uk-icon-plus"></button>
       </div>
     </div>
     </div>
     <!--工具栏-->
     <!--图书数据表格-->
     <table class="uk-table uk-table-striped" v-if="bookFilter.length">
       <thead>
         <tr>
           <th class="uk-text-center disable-select" 
           :class="{'sorting':sorted('name')}" data-col="name" @click="sortBy('name')"><div>书名
           <span :class="{
            'uk-icon-sort-asc':direction=='asc',
            'uk-icon-sort-desc':direction=='desc'
           }"
           v-if="sortingKey=='name'">
           </span></div>
           </th>
           <th class="uk-text-center uk-width-1-6 disable-select"
           :class="{'sorting':sorted('category')}"
           data-col="category"
           @click="sortBy('category')"><div>类别
             <span :class="{
               'uk-icon-sort-asc':direction=='asc',
               'uk-icon-sort-desc':direction=='desc'
             }"
              v-if="sortingKey=='category'">
           </span></div>
           </th>
           <th class="uk-text-center uk-widt-1-6 disable-select"
           :class="{'sorting':sorted('published')}"
           data-col="published"
           @click="sortBy('published')">
           <div>出版日期
             <span :class="{
               'uk-icon-sort-asc':direction=='asc',
               'uk-icon-sort-desc':direction=='desc'
               }"
               v-if="sortingKey=='published'"></span></div>
           </th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="book in bookFilter"
         :class="{'book-selected':book.selected}"
         :data-isbn="book.isbn">
           <td class="uk-form">
            <div class="uk-grid" :class="{'sorting':sorted('name')}">
              <div class="uk-width-1-10">
                <input type="checkbox"
                       :data-isbn="book.isbn"
                       v-model="book.selected"
                       @change="selectionChanged(book,$event)"
                       class="uk-margin-right cb-book"/>
              </div>
               <div class="uk-width-9-10">
                <a class="uk-h3 book-name"
                   href="javascript:void(0)"
                   :title="book.name"
                   data-uk-tooltip="{pos:'top'}"
                   @click.prevent="editBook(book)">{{ book.name }}</a>
                <p class="authors uk-text-muted uk-text-small">{{ book.authors | join }}</p>
              </div>
              </div>
            </td>
             <td class="small">
              <div class="fill"
                :class="{'sorting':sorted('category')}">
                {{book.category}}
              </div>
            </td>
            <td class="published uk-text-center">
              <div class="fill"
                :class="{'sorting':sorted('published')}">
                {{book.published}}
              </div>
            </td>
            </tr>
       </tbody>
     </table>
     <!--图书数据表格-->
  </div>
  <!--页面正文-->
  <!--对话框-->
    <!--图书编辑/新建 数据表单-->
  <!--对话框-->
  </div>
</template>
<script>
  import BookData from "./fixtures/books.json"
  import _ from 'lodash'
  //Vue.prototype._=_
  export default{
    data(){
      return {
        terms:'',
        books:BookData,
        selection:[],
        sortingKey:'name',
        direction:'asc'
      }
    },
    computed:{
      bookFilter(){
        //用函数式将书名包含有terms内容的图书都筛选出来，如果没有则返回原数组
        var result= this.terms.length?this.books.filter(x=>x.name.indexOf(this.terms)>-1):this.books
        console.log(result.length);
        return result;
      },
      hasSelection(){
        return this.selection.length>0
      }
    },
      methods:{
        selectionChanged(book,e){
          if(e.target.checked){
            this.selection.push(book.isbn)
            //取唯一值
            this.selection=_.uniq(this.selection)
          }
          else{
            //排除符合条件的数据并返回新的数组
            this.selection=_.reject(this.selection,b=>book.isbn===b)
          }
        },
        sorted(key){
          return key===this.sortingKey
        },
        sortBy(key){
          if(key===this.sortingKey){
            //对排序方向进行互斥式交换
            this.direction==this.direction==='asc'?'desc':'asc'
          }
          this.sortingKey=key
          this.books=_.orderBy(this.books,key,this.direction)
        }
      }
    
  }
</script>