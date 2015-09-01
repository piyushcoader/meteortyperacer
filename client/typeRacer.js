Array.prototype.getIndexBy = function (name, value) {
	for (var i = 0; i < this.length; i++) {
		if (this[i][name] == value) {
			return i;
		}
	}
}

Template.typeRacerGame.onCreated(function(){
	var sampleString="this is sample type Racer.",
			arraySample=[];
	_.each(sampleString.split(' '),function(value,index){
			arraySample.push({textValue:value});
	});
	this.typeRacerContent=new ReactiveVar(arraySample);
	this.textTyped=new ReactiveVar({
		index:0,
		currentWord:null
	});
	this.currentTyping=new ReactiveVar(null);
	Session.set('isValid',false);
});
Template.typeRacerGame.helpers({
	typeRacerText:function(){
		return Template.instance().typeRacerContent.get();
	},
	getColor:function(){

		var typeRacerContent=Template.instance().typeRacerContent.get(),
				textTyped=Template.instance().textTyped.get();
		if(typeRacerContent[textTyped.index].textValue==this.textValue)
			return 'green';
		else
			return 'blue';
	},
	isValidInput:function(){
			if(Session.get('isValid'))
				return 'green';
			else
				return 'red';

	}
});
Template.typeRacerGame.events({
  'keyup .typeRacerTextInput':function(e,t){
       var typeRacerContent=Template.instance().typeRacerContent.get(),
					 textTyped=Template.instance().textTyped.get();
				var x=(typeRacerContent[textTyped.index].textValue.search(t.find('.typeRacerTextInput').value));
			if(x==0)
				Session.set('isValid',true);
			else
				Session.set('isValid',false);

		if(e.keyCode==32){
			var typedContent=t.find('.typeRacerTextInput').value;
				typedContent=typedContent.substring(0,typedContent.length-1);
			if(typedContent==typeRacerContent[textTyped.index].textValue){
				if(typeRacerContent[typeRacerContent.length-1].textValue==typedContent){
					alert('hurrey');
					textTyped.index=0,
							textTyped.currentWord=null
				}else{
					textTyped.index++,
							textTyped.currentWord=typedContent;
				}
				Template.instance().textTyped.set(textTyped);
				t.find('.typeRacerTextInput').value=null;
			}
		}


  }
});