accordions={render:function(e){var t=[],s="";e.bordered&&(s="-bordered"),t.push('<div class="usa-accordion'+s+'">'),t.push('<ul class="usa-unstyled-list">');var a=!1,i=e.accordions;for(var n in i)accordion=i[n],accordion.index=n,expanded=void 0!==accordion.expanded&&accordion.expanded===!0,a&&expanded?accordion.expanded=!1:!a&&expanded&&(a=!0),t.push(this.accordion(accordion));return t.push("</ul>"),t.push("</div>"),t.join("")},accordion:function(e){var t=1*e.index+1,s=e.title,a=e.content,i="",n="";void 0!==e.expanded&&e.expanded===!0&&(i=' aria-expanded="true"',n=' aria-hidden="false"');var o=[];return o.push("<li>"),o.push('<button class="usa-button-unstyled"'+i+' aria-controls="accordions-'+t+'">'),o.push(s),o.push("</button>"),o.push('<div id="accordions-'+t+'"'+n+' class="usa-accordion-content">'),o.push(a),o.push("</div>"),o.push("</li>"),o.join("")}},alert={render:function(e){console.log("Alert:"+e.type);var t={success:'<div class="usa-alert usa-alert-success"><div class="usa-alert-body"><h3 class="usa-alert-heading">'+e.title+'</h3><p class="usa-alert-text">'+e.description+"</p></div></div>",warning:'<div class="usa-alert usa-alert-warning"><div class="usa-alert-body"><h3 class="usa-alert-heading">'+e.title+'</h3><p class="usa-alert-text">'+e.description+"</p></div></div>",error:'<div class="usa-alert usa-alert-error"><div class="usa-alert-body"><h3 class="usa-alert-heading">'+e.title+'</h3><p class="usa-alert-text">'+e.description+"</p></div></div>",info:'<div class="usa-alert usa-alert-info"><div class="usa-alert-body"><h3 class="usa-alert-heading">'+e.title+'</h3><p class="usa-alert-text">'+e.description+"</p></div></div>"};return t[e.type]||t.success}},button={render:function(e){console.log(e.type);var t={"default":"<button>"+e.data+"</button>",alt:'<button class="usa-button-primary-alt">'+e.data+"</button>",secondary:'<button class="usa-button-secondary">'+e.data+"</button>",gray:'<button class="usa-button-gray">'+e.data+"</button>",outline:'<button class="usa-button-outline type="button">'+e.data+"</button>",inverted:'<button class="usa-button-outline-inverse" type="button">'+e.data+"</button>",disbled:'<button class="usa-button-disabled" disabled="'+e.disabled+'">'+e.data+"</button>",big:'<button class="usa-button-big" type="button">'+e.data+"</button>"};return t[e.type]||t.primary}},label={render:function(e){console.log(e.type);var t={small:'<span class="usa-label">'+e.data+"</span>",large:'<span class="usa-label-big">'+e.data+"</span>"};return t[e.type]||t.small}},footer={render:function(e){console.log(e.type);var t='<section id="iae-footer"><footer><div class="usa-grid usa-footer-return-to-top"><a href="#">Return to top</a></div><div class="iae-footer"><div class="iae-footer-body usa-grid"><div class="iae-footer-logo usa-width-one-sixth"><a class="image-wrap" href="http://www.gsa.gov" target="_blank"><img alt="GSA logo" src="assets/img/logo-gsa.png"></a></div><ul class="iae-footer-links usa-unstyled-list usa-width-five-sixths"><li class=" usa-width-one-fourth"><h4 class="m_T-0 iae-footer-head">About</h4><ul class="iae-footer-links usa-unstyled-list"><li class="m_B"><a href="/about/" title="What Is This Site?">What Is This Site?</a></li><li class="m_B"><a href="/transition-roadmap/" title="Transition Timeline">Transition Timeline</a></li><li class="m_B"><a href="https://interact.gsa.gov/group/integrated-award-environment-iae-industry-community" target="_blank" title="Join our Interact Community">Join our Interact Community</a></li><li class="m_B"><a href="/for-developers/" title="For Developers">For Developers</a></li></ul></li></ul></div></div></footer></section>';return t}},header={render:function(){var e='<section id="iae-header"><header><div class="iae-header"><div class="usa-grid"><div class="iae-header-menu"><div class="iae-header-nav"><i class="fa fa-bars"></i><div class="m_T-1x">MENU</div></div><div class="iae-header-logo"><a class="image-wrap" href="#"><img alt="Transtion SAM.gov Logo" src="assets/img/transition-sam-logo.png"></a></div></div><div class="iae-sign-in"><i class="fa fa-search"></i><i class="fa fa-bell"></i><div class="pull-right m_L-3x">Create Account</div><div class="pull-right">|</div><div class="pull-right m_R-3x">Sign in</div></div></div></div></header></section>';return e}},select={render:function(e){if(this.isInvalidConfiguration(e))return"";var t="";return this.hasError(e)&&(t=' class="usa-input-error"'),html="<div"+t+">",html+=this.getOpening(e),html+=this.getOptions(e),html+=this.getClosing(e),html+="</div>"},getOpening:function(e){var t=[];if("radio"==e.type||"checkbox"==e.type)t.push('<fieldset class="usa-fieldset-inputs">'),t.push(this.getLabel(e)),t.push(this.getError(e)),t.push(this.getHint(e)),t.push('<ul class="usa-unstyled-list">');else{t.push(this.getLabel(e)),t.push(this.getError(e)),t.push(this.getHint(e));var s="";this.hasError(e)&&(s=' aria-describedby="'+e.name+'-input-error"');var a="";this.hasDisabled(e)&&(a=" disabled"),t.push('<select id="'+e.name+'" name="'+e.name+'"'+s+a+">")}return t.join("")},getLabel:function(e){var t="",s=this.getLabelClass(e),a=this.getLabelMark(e);return t="radio"==e.type||"checkbox"==e.type?"<legend"+s+">"+e.label+a+"</legend>":'<label for="'+e.name+'"'+s+">"+e.label+a+"</label>"},getLabelClass:function(e){var t=[];this.hasError(e)&&t.push("usa-input-error-label"),void 0!==e.srOnly&&e.srOnly&&t.push("usa-sr-only");var s="";return t.length>0&&(s=' class="',s+=t.join(" "),s+='"'),s},getLabelMark:function(e){var t="";return void 0!==e.markAs&&"required"==e.markAs?t=' <span class="usa-additional_text">Required</span>':void 0!==e.markAs&&"optional"==e.markAs&&(t=' <span class="usa-additional_text">Optional</span>'),t},getClosing:function(e){var t=[];return"radio"==e.type||"checkbox"==e.type?(t.push("</ul>"),t.push("</fieldset>")):t.push("</select>"),t.join("")},getOptions:function(e){var t=this.disabled(e),s=this.selected(e),a=[];for(var i in e.options){var n={type:e.type,name:e.name,value:i,title:e.options[i],selected:s,disabled:t},o=this.option(n);a.push(o)}return a.join("")},option:function(e){var t=this.optionSelectedText(e),s=[];if("radio"==e.type||"checkbox"==e.type){var a="";this.optionIsDisabled(e)&&(a=" disabled"),s.push("<li>"),s.push('<input id="'+e.value+'" type="'+e.type+'" name="'+e.name+'" value="'+e.value+'"'+a+t+">"),s.push('<label for="'+e.value+'">'+e.title+"</label>"),s.push("</li>")}else s.push('<option value="'+e.value+'"'+t+">"+e.title+"</option>");return s.join("")},getError:function(e){return this.hasError(e)?'<span id="'+e.name+'-input-error" class="usa-input-error-message" role="alert">'+e.error+"</span>":""},getHint:function(e){return this.hasHint(e)?'<span class="usa-form-hint">'+e.hint+"</span>":""},hasDisabled:function(e){return void 0!==e.disabled&&e.disabled.length>0},disabled:function(e){return this.hasDisabled(e)?e.disabled:[]},hasSelected:function(e){return void 0!==e.selected&&e.selected.length>0},selected:function(e){return this.hasSelected(e)?e.selected:[]},optionIsSelected:function(e){return this.hasSelected(e)&&e.selected.indexOf(e.value)>-1},optionSelectedText:function(e){return selected="",!this.optionIsSelected(e)||"checkbox"!=e.type&&"radio"!=e.type?this.optionIsSelected(e)&&"dropdown"==e.type&&(selected=" selected"):selected=" checked",selected},optionIsDisabled:function(e){return this.hasDisabled(e)&&e.disabled.indexOf(e.value)>-1},hasError:function(e){return void 0!==e.error&&e.error.length>0},hasHint:function(e){return void 0!==e.hint&&e.hint.length>0},isInvalidConfiguration:function(e){return void 0==e.label||e.label.length<1?(console.log('Selects: "label" is required member. And must have value.'),console.log(e),!0):void 0==e.name||e.name.length<1?(console.log('Selects: "name" is required member. And must have value.'),console.log(e),!0):void 0==e.type||e.type.length<1?(console.log('Selects: "type" is required member. And must have value'),console.log(e),!0):void 0==e.options||0==Object.keys(e.options).length?(console.log('Selects: "options" is required member, and must have at least one.'),console.log(Object.keys(e.options).length),console.log(e),!0):("dropdown"==e.type||"radio"==e.type)&&void 0!==e.selected&&e.selected.length>1?(console.log("Selects: A select dropdown can only have one pre-selected value."),console.log(Object.keys(e.selected).length),console.log(e),!0):!1}};