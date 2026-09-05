(function(s){let o=s.defaultRankType,d=1;function c(n,t=null){t!==null&&(o=t.toString()),d=n;const e=document.getElementById("rankListContainer"),i=document.getElementById("rankPaginationTop"),a=document.getElementById("rankPaginationBottom");e.innerHTML=`
            <div class="text-center py-5 text-muted">
                載入中...
            </div>
        `,i.innerHTML="",a.innerHTML="";const r=`/LeaderBoard/RankPlayerList?page=${n}&ranktype=${o}`;fetch(r,{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest"}}).then(l=>{if(!l.ok)throw new Error("載入失敗");return l.text()}).then(l=>{e.innerHTML=l;const p=e.querySelector("[data-total-pages]");if(p){const v=parseInt(p.dataset.totalPages||"1");u(v,d)}y()}).catch(l=>{console.error(l),e.innerHTML=`
                    <div class="alert alert-danger">
                        資料載入失敗
                    </div>
                `})}function u(n,t){const e=document.getElementById("rankPaginationTop"),i=document.getElementById("rankPaginationBottom"),a=f(n,t);e.innerHTML=a,i.innerHTML=a,m(),h()}function f(n,t){if(!n||n<=1)return"";let e="";e+=`
            <a href="javascript:void(0)"
               class="page-btn ${t<=1?"disabled":""}"
               data-page="${t-1}">
               上一頁
            </a>
        `;const i=g(n,t);for(const a of i)a==="..."?e+=`
                    <a href="javascript:void(0)"
                       class="page-btn page-ellipsis"
                       data-total-pages="${n}"
                       data-current-page="${t}">
                       …
                    </a>
                `:e+=`
                    <a href="javascript:void(0)"
                       class="page-btn ${a===t?"active":""}"
                       data-page="${a}">
                       ${a}
                    </a>
                `;return e+=`
            <a href="javascript:void(0)"
               class="page-btn ${t>=n?"disabled":""}"
               data-page="${t+1}">
               下一頁
            </a>
        `,e}function g(n,t){const e=[];if(n<=7){for(let r=1;r<=n;r++)e.push(r);return e}e.push(1),t>4&&e.push("...");const i=Math.max(2,t-1),a=Math.min(n-1,t+1);for(let r=i;r<=a;r++)e.push(r);return t<n-3&&e.push("..."),e.push(n),[...new Set(e)]}function h(){document.querySelectorAll(".page-ellipsis").forEach(n=>{n.addEventListener("click",function(){const t=parseInt(this.dataset.totalPages||"1"),e=parseInt(this.dataset.currentPage||"1"),i=prompt(`請輸入要跳轉的頁碼（1 ~ ${t}）`,e);if(i===null)return;const a=parseInt(i.trim(),10);if(isNaN(a)){alert("請輸入有效的數字頁碼");return}if(a<1||a>t){alert(`頁碼必須介於 1 到 ${t} 之間`);return}c(a),window.scrollTo({top:0,behavior:"smooth"})})})}function m(){document.querySelectorAll("#rankPaginationTop .page-btn[data-page], #rankPaginationBottom .page-btn[data-page]").forEach(n=>{n.addEventListener("click",function(){if(this.classList.contains("disabled"))return;const t=parseInt(this.dataset.page,10);!isNaN(t)&&t>0&&(c(t),window.scrollTo({top:0,behavior:"smooth"}))})})}function y(){document.querySelectorAll(".inner-page-btn[data-page]").forEach(n=>{n.addEventListener("click",function(){if(this.classList.contains("disabled"))return;const t=parseInt(this.dataset.page);!isNaN(t)&&t>0&&(c(t),window.scrollTo({top:0,behavior:"smooth"}))})})}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".rank-tab").forEach(n=>{n.addEventListener("click",function(){const t=this.dataset.ranktype;document.querySelectorAll(".rank-tab").forEach(e=>e.classList.remove("active")),this.classList.add("active"),c(1,t)})}),c(1,o)})})((()=>{const s=document.getElementById("abi-config-top-rank");if(!s||s.tagName!=="SCRIPT"||s.type!=="application/json")throw new Error("invalid protected page config element");let o;try{o=JSON.parse(s.textContent||"")}catch(c){throw new Error("invalid protected page config JSON")}if(o===null||Array.isArray(o)||typeof o!="object")throw new Error("invalid protected page config shape");if(Object.keys(o).length!==1||!Object.prototype.hasOwnProperty.call(o,"defaultRankType")||typeof o.defaultRankType!="string")throw new Error("invalid protected page config fields");return Object.freeze(o)})());
