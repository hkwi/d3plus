//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get array of available text values
//------------------------------------------------------------------------------
d3plus.variable.text = function(vars,obj,depth) {

  if ( typeof depth !== "number" ) var depth = vars.depth.value

  var key = vars.id.nesting[depth]

  if ( vars.text.nesting && d3plus.object.validate(vars.text.nesting) ) {
    if ( vars.text.nesting[key] ) {
      var textKeys = vars.text.nesting[key]
    }
    else {
      var textKeys = vars.text.nesting[ d3.keys(vars.text.nesting)[0] ]
    }
  }
  else {
    var textKeys = []
    if (vars.text.value) textKeys.push(vars.text.value)
    textKeys.push(key)
  }

  if ( !(textKeys instanceof Array) ) {
    textKeys = [ textKeys ]
  }

  var names = []

  if (d3plus.object.validate(obj) && "d3plus" in obj && obj.d3plus.text) {
    names.push(obj.d3plus.text)
  }

  textKeys.forEach(function( t ){

    var name = d3plus.variable.value( vars , obj , t , key )

    if ( name ) {
      if ( !(name instanceof Array) ) {
        name = vars.format.value(name.toString())
      }
      else {
        name.forEach(function(n){
          n = vars.format.value(n.toString())
        })
      }
      names.push(name)
    }
  })

  return names

}
