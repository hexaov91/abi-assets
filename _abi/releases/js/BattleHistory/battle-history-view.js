(async o=>{var v,c,p;if(!o.detailUrl.startsWith("/")||o.detailUrl.startsWith("//"))throw new Error("invalid battle history detail URL");if((v=window.GameLocalization)!=null&&v.init)try{await window.GameLocalization.init(window.GameLocalization.getLang())}catch(t){console.error("GameLocalization init failed",t)}const r=o.uid;function m(t,e="-"){var a;return(a=window.SiteTime)!=null&&a.formatUnix?window.SiteTime.formatUnix(t,{unit:"seconds",fallback:e}):e}(p=(c=window.SiteTime)==null?void 0:c.formatElements)==null||p.call(c,document);function h(t){var a,n,i;const e=Number(t);return!Number.isFinite(e)||e<=0?"未知":(i=(n=(a=window.GameLocalization)==null?void 0:a.t)==null?void 0:n.call(a,"UACommonItemTable","Name",e,String(e)))!=null?i:String(e)}function w(){document.querySelectorAll(".js-map-name").forEach(t=>{var a,n,i;const e=Number(t.dataset.mapId);if(!Number.isFinite(e)||e<=0){t.textContent="未知地圖";return}t.textContent=(i=(n=(a=window.GameLocalization)==null?void 0:a.t)==null?void 0:n.call(a,"UABattleMapTable","Name",e,`地圖 ${e}`))!=null?i:`地圖 ${e}`}),document.querySelectorAll(".js-rule-name").forEach(t=>{var n,i,d;const e=Number(t.dataset.mapGroupId);if(!Number.isFinite(e)||e<=0)return;const a=(d=(i=(n=window.GameLocalization)==null?void 0:n.t)==null?void 0:i.call(n,"UAMapGroupConfTable","show_name",e,`模式 ${e}`))!=null?d:`模式 ${e}`;t.textContent=`${a}（${e}）`})}w();const b=t=>{var e,a;return t?`
            <div class="battle-detail-murderer">
                <div>擊殺者：${t.murderer||"-"}</div>
                <div>GID：${(e=t.murdererUid)!=null?e:"-"}</div>
                <div>隊伍ID：${(a=t.murdererTeamId)!=null?a:"-"}</div>
                <div>時間：${m(t.murdererTimeUnix,t.murdererTime||"-")}</div>
                <div>武器：${h(t.murdererParam2)}</div>
            </div>
        `:"-"},f=t=>!t||t.length===0?'<div class="text-muted">查無詳細資料。</div>':t.map(e=>{const a=e.isCurrentTeam?`你的隊伍（隊伍${e.teamId}）`:`其他隊伍（隊伍${e.teamId}）`,n=(e.players||[]).map(i=>{var d,u,s,l;return`
                <tr>
                    <td style="color:${i.resultColor}; font-weight:700;">${i.resultText}</td>
                    <td>
                        <div>${i.name||"-"}</div>
                        <div class="battle-detail-subtext">GID：${(d=i.gid)!=null?d:"-"}</div>
                    </td>
                    <td>${i.resultCode===2?b(i.murdererInfo):"-"}</td>
                    <td>${m(i.startTimeUnix,i.startTime||"-")}</td>
                    <td>${(u=i.gameTime)!=null?u:"-"}</td>
                    <td>${(s=i.gainValue)!=null?s:"-"}</td>
                    <td>${(l=i.rankedLevel)!=null?l:"-"}</td>
                </tr>
            `}).join("");return`
                <div class="mb-3">
                    <div class="battle-detail-title">${a}</div>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped align-middle battle-detail-table">
                            <thead>
                                <tr>
                                    <th>結果</th>
                                    <th>玩家名稱</th>
                                    <th>擊殺者訊息</th>
                                    <th>開始時間</th>
                                    <th>存活時間(s)</th>
                                    <th>帶出價值</th>
                                    <th>牌位ID</th>
                                </tr>
                            </thead>
                            <tbody>${n}</tbody>
                        </table>
                    </div>
                </div>
            `}).join("");document.querySelectorAll(".js-detail-btn").forEach(t=>{t.addEventListener("click",async()=>{const e=t.dataset.battleId,a=t.dataset.roomTeamId,n=document.querySelector(`.js-detail-row[data-detail-for="${e}|${a}"]`),i=n==null?void 0:n.querySelector(".js-detail-content"),d=t.closest(".battle-history-entry");if(!n||!i)return;if(!n.classList.contains("d-none")){n.classList.add("d-none"),d==null||d.classList.remove("is-expanded"),t.setAttribute("aria-expanded","false"),t.textContent="展示詳情";return}n.classList.remove("d-none"),d==null||d.classList.add("is-expanded"),t.setAttribute("aria-expanded","true"),t.textContent="收合詳情",i.innerHTML='<div class="text-muted">詳細資料載入中...</div>';try{const s=await fetch(o.detailUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({gid:r,battleId:e,roomTeamId:String(a)})}),l=await s.json();if(!s.ok){i.innerHTML=`<div class="text-danger">${l.message||"詳細資料取得失敗。"}</div>`;return}i.innerHTML=f(l.teams)}catch(s){i.innerHTML='<div class="text-danger">詳細資料讀取失敗，請稍後再試。</div>'}})})})((()=>{const o=document.getElementById("abi-config-battle-history-view");if(!o||o.tagName!=="SCRIPT"||o.type!=="application/json")throw new Error("invalid protected page config element");let r;try{r=JSON.parse(o.textContent||"")}catch(h){throw new Error("invalid protected page config JSON")}if(r===null||Array.isArray(r)||typeof r!="object")throw new Error("invalid protected page config shape");if(Object.keys(r).length!==2||!Object.prototype.hasOwnProperty.call(r,"uid")||!Object.prototype.hasOwnProperty.call(r,"detailUrl")||typeof r.uid!="string"||typeof r.detailUrl!="string")throw new Error("invalid protected page config fields");return Object.freeze(r)})());
