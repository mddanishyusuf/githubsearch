app.controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($timeout, $q, $log, $scope, $http, $window, $location, $state) {
	$scope.showTopGitList = false
	$scope.gitList = false
    var self = this;


    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
         return results;
    }

    function selectedItemChange(item) {
    	$scope.item = item
      $state.go('language.lang', {item_name:item})
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
    	$scope.language_list = ["1C Enterprise","ABAP","ActionScript","Ada","Agda","AGS Script","Alloy","AMPL","ANTLR","ApacheConf","Apex","API Blueprint","APL","AppleScript","Arc","Arduino","ASP","AspectJ","Assembly","ATS","Augeas","AutoHotkey","AutoIt","Awk","Batchfile","Befunge","Bison","BitBake","BlitzBasic","BlitzMax","Bluespec","Boo","Brainfuck","Brightscript","Bro","C","C#","C++","Cap'n Proto","CartoCSS","Ceylon","Chapel","Charity","ChucK","Cirru","Clarion","Clean","Click","CLIPS","Clojure","CMake","COBOL","CoffeeScript","ColdFusion","Common Lisp","Component Pascal","Cool","Coq","Crystal","Csound","Csound Document","Csound Score","CSS","Cucumber","Cuda","Cycript","D","Darcs Patch","Dart","Diff","DIGITAL Command Language","DM","Dogescript","DTrace","Dylan","E","Eagle","eC","ECL","Eiffel","Elixir","Elm","Emacs Lisp","EmberScript","EQ","Erlang","F#","Factor","Fancy","Fantom","FLUX","Forth","FORTRAN","FreeMarker","Frege","Game Maker Language","GAMS","GAP","GCC Machine Description","GDB","GDScript","Genshi","Gettext Catalog","GLSL","Glyph","Gnuplot","Go","Golo","Gosu","Grace","Grammatical Framework","Groff","Groovy","Hack","Handlebars","Harbour","Haskell","Haxe","HCL","HLSL","HTML","Hy","HyPhy","IDL","Idris","IGOR Pro","Inform 7","Inno Setup","Io","Ioke","Isabelle","J","Jasmin","Java","JavaScript","JFlex","JSONiq","Julia","Jupyter Notebook","KiCad","Kit","Kotlin","KRL","LabVIEW","Lasso","Lean","Lex","LilyPond","Limbo","Liquid","LiveScript","LLVM","Logos","Logtalk","LOLCODE","LookML","LoomScript","LSL","Lua","M","M4","Makefile","Mako","Markdown","Mask","Mathematica","Matlab","Max","MAXScript","Mercury","Metal","MiniD","Mirah","Modelica","Modula-2","Module Management System","Monkey","Moocode","MoonScript","MTML","mupad","Myghty","NCL","Nemerle","nesC","NetLinx","NetLinx+ERB","NetLogo","NewLisp","Nginx","Nimrod","Nit","Nix","NSIS","Nu","Objective-C","Objective-C++","Objective-J","OCaml","Omgrofl","ooc","Opa","Opal","OpenEdge ABL","OpenSCAD","Ox","Oxygene","Oz","Pan","Papyrus","Parrot","Pascal","PAWN","Perl","Perl6","PHP","PicoLisp","PigLatin","Pike","PLpgSQL","PLSQL","PogoScript","Pony","PostScript","POV-Ray SDL","PowerBuilder","PowerShell","Processing","Prolog","Propeller Spin","Protocol Buffer","Puppet","Pure Data","PureBasic","PureScript","Python","QMake","QML","R","Racket","Ragel in Ruby Host","RAML","RDoc","REALbasic","Rebol","Red","Redcode","Ren'Py","RenderScript","REXX","RobotFramework","Rouge","Ruby","RUNOFF","Rust","SaltStack","SAS","Scala","Scheme","Scilab","Self","Shell","ShellSession","Shen","Slash","Smali","Smalltalk","Smarty","SMT","SourcePawn","SQF","SQL","SQLPL","Squirrel","SRecode Template","Stan","Standard ML","Stata","SuperCollider","Swift","SystemVerilog","Tcl","Tea","Terra","TeX","Thrift","TLA","Turing","TXL","TypeScript","Uno","UnrealScript","UrWeb","Vala","VCL","Verilog","VHDL","VimL","Visual Basic","Volt","Vue","Web Ontology Language","WebIDL","wisp","X10","xBase","XC","XML","Xojo","XPages","XProc","XQuery","XS","XSLT","Xtend","Yacc","Zephir","Zimpl"]
      // $scope.no_of_language = $scope.language_list.length;
      return $scope.language_list
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {

        return (state.toLowerCase().indexOf(lowercaseQuery) === 0);
      };

    }
  }