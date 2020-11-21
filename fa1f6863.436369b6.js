(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{78:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return r})),t.d(n,"metadata",(function(){return s})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return u}));var a=t(2),i=t(6),o=(t(0),t(81)),r={id:"pysa-running",title:"Running Pysa",sidebar_label:"Running Pysa",custom_edit_url:"https://www.internalfb.com/intern/diffusion/FBS/browse/master/fbcode/tools/pyre/documentation/website/docs/pysa_running.md"},s={unversionedId:"pysa-running",id:"pysa-running",isDocsHomePage:!1,title:"Running Pysa",description:"This page walks you through the basics of running Pysa. If you want exercises to",source:"@site/docs/pysa_running.md",permalink:"/docs/pysa-running",editUrl:"https://www.internalfb.com/intern/diffusion/FBS/browse/master/fbcode/tools/pyre/documentation/website/docs/pysa_running.md",sidebar_label:"Running Pysa",sidebar:"documentation",previous:{title:"Overview",permalink:"/docs/pysa-basics"},next:{title:"Feature Annotations",permalink:"/docs/pysa-features"}},l=[{value:"Setup",id:"setup",children:[]},{value:"Example",id:"example",children:[{value:"1. Source Code",id:"1-source-code",children:[]},{value:"2. Taint Config",id:"2-taint-config",children:[]},{value:"3. Taint Models",id:"3-taint-models",children:[]},{value:"4. Pysa Configuration",id:"4-pysa-configuration",children:[]},{value:"Analysis",id:"analysis",children:[]},{value:"Understanding the results",id:"understanding-the-results",children:[]}]}],c={rightToc:l};function u(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This page walks you through the basics of running Pysa. If you want exercises to\nwalk you through using Pysa's more advanced features, check out ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebook/pyre-check/tree/master/documentation/pysa_tutorial"}),"this\ntutorial"),"."),Object(o.b)("h2",{id:"setup"},"Setup"),Object(o.b)("p",null,"The setup requires the following 4 types of files."),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Source Code")," (",Object(o.b)("inlineCode",{parentName:"li"},"*.py"),"): This is your application's code."),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Taint Config")," (",Object(o.b)("inlineCode",{parentName:"li"},"taint.config"),"): This file declares sources, sinks,\nfeatures, and rules."),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Taint Models")," (",Object(o.b)("inlineCode",{parentName:"li"},".pysa"),"): These files link together the information in your\nsource code and ",Object(o.b)("inlineCode",{parentName:"li"},"taint.config"),". They tell Pysa where in our code there\nexist sources and sinks."),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Pysa Configuration")," (",Object(o.b)("inlineCode",{parentName:"li"},".pyre_configuration"),"): Parts of this file are\ncritical to using Pysa. ",Object(o.b)("inlineCode",{parentName:"li"},"source_directories")," tells Pysa\nthe directory containing the source code you want to analyze.\n",Object(o.b)("inlineCode",{parentName:"li"},"taint_models_path")," tells Pysa where to find the config and model files.")),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)("p",null,"Let's look at a simple taint analysis example. To follow along, create a\ndirectory ",Object(o.b)("inlineCode",{parentName:"p"},"static_analysis_example")," and navigate to it. Paste the code snippets\ninto the appropriately named files."),Object(o.b)("h3",{id:"1-source-code"},"1. Source Code"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'# static_analysis_example/source.py\n\nimport os\n\ndef get_image(url):\n    command = "wget -q https:{}".format(url)\n    return os.system(command)\n\ndef convert():\n    image_link = input("image link: ")\n    image = get_image(image_link)\n')),Object(o.b)("p",null,"Notice the following:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"The ",Object(o.b)("inlineCode",{parentName:"li"},"input")," function is a taint source since it gets input directly from\nthe user."),Object(o.b)("li",{parentName:"ul"},"The ",Object(o.b)("inlineCode",{parentName:"li"},"os.system")," function is a taint sink, since we do not want user-controlled\nvalues to flow into it."),Object(o.b)("li",{parentName:"ul"},"The return value of ",Object(o.b)("inlineCode",{parentName:"li"},"input")," is used as the URL for a ",Object(o.b)("inlineCode",{parentName:"li"},"wget")," call, which is\nexecuted by ",Object(o.b)("inlineCode",{parentName:"li"},"os.system"),". The ",Object(o.b)("inlineCode",{parentName:"li"},"wget")," can therefore be doing anything, out of\nthe programmer's control."),Object(o.b)("li",{parentName:"ul"},"This data flow should be identified as a potential security issue.")),Object(o.b)("h3",{id:"2-taint-config"},"2. Taint Config"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'# static_analysis_example/stubs/taint/taint.config\n\n{\n  sources: [\n    {\n      name: "UserControlled",\n      comment: "use to annotate user input"\n    }\n  ],\n\n  sinks: [\n    {\n      name: "RemoteCodeExecution",\n      comment: "use to annotate execution of code"\n    }\n  ],\n\n  features: [],\n\n  rules: [\n    {\n      name: "Possible shell injection",\n      code: 5001,\n      sources: [ "UserControlled" ],\n      sinks: [ "RemoteCodeExecution" ],\n      message_format: "Data from [{$sources}] source(s) may reach [{$sinks}] sink(s)"\n    }\n  ]\n}\n')),Object(o.b)("p",null,"This declares the valid sources and sinks that Pysa should recognize. We\nalso tell Pysa that data flowing from a ",Object(o.b)("inlineCode",{parentName:"p"},"UserControlled")," source to a\n",Object(o.b)("inlineCode",{parentName:"p"},"RemoteCodeExecution")," sink is a possible shell injection."),Object(o.b)("h3",{id:"3-taint-models"},"3. Taint Models"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"# static_analysis_example/stubs/taint/general.pysa\n\n# model for raw_input\ndef input(__prompt = ...) -> TaintSource[UserControlled]: ...\n\n# model for os.system\ndef os.system(command: TaintSink[RemoteCodeExecution]): ...\n")),Object(o.b)("p",null,"This file links together the information in ",Object(o.b)("inlineCode",{parentName:"p"},"source.py")," and ",Object(o.b)("inlineCode",{parentName:"p"},"taint.config"),". We\nuse it to tell Pysa where in our code there exist sources and sinks."),Object(o.b)("h3",{id:"4-pysa-configuration"},"4. Pysa Configuration"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'# static_analysis_example/.pyre_configuration\n\n{\n  "source_directories": ["."],\n  "taint_models_path": "stubs/taint"\n}\n')),Object(o.b)("p",null,"Pysa needs to know what directory to analyze, as well as where to find the config\nand model files."),Object(o.b)("h3",{id:"analysis"},"Analysis"),Object(o.b)("p",null,"Now let's run the static analysis:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),'[~/static_analysis_example] $ pyre analyze\n \u019b Fixpoint iterations: 2\n[\n  {\n    "line": 9,\n    "column": 22,\n    "path": "source.py",\n    "code": 5001,\n    "name": "Possible shell injection",\n    "description":\n      "Possible shell injection [5001]: Data from [UserControlled] source(s) may reach [RemoteCodeExecution] sink(s)",\n    "long_description":\n      "Possible shell injection [5001]: Data from [UserControlled] source(s) may reach [RemoteCodeExecution] sink(s)",\n    "concise_description":\n      "Possible shell injection [5001]: Data from [UserControlled] source(s) may reach [RemoteCodeExecution] sink(s)",\n    "inference": null,\n    "define": "source.convert"\n  }\n]\n')),Object(o.b)("p",null,"Looking at the output, we see that pyre surfaces the tainted data flow that we\nexpected."),Object(o.b)("p",null,"Let's run it again and save the results:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"[~/static_analysis_example] $ pyre analyze --save-results-to ./\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"--save-results-to")," option will save more detailed results to\n",Object(o.b)("inlineCode",{parentName:"p"},"./taint-output.json"),"."),Object(o.b)("h3",{id:"understanding-the-results"},"Understanding the results"),Object(o.b)("p",null,"See ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/static-analysis-post-processor"}),"Static Analysis Post Processor"),"."))}u.isMDXComponent=!0},81:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return m}));var a=t(0),i=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=i.a.createContext({}),u=function(e){var n=i.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=u(e.components);return i.a.createElement(c.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},d=i.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,r=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(t),d=a,m=p["".concat(r,".").concat(d)]||p[d]||b[d]||o;return t?i.a.createElement(m,s(s({ref:n},c),{},{components:t})):i.a.createElement(m,s({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,r[1]=s;for(var c=2;c<o;c++)r[c]=t[c];return i.a.createElement.apply(null,r)}return i.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);