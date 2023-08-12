input = "8993a544-1013-41b7-973b-90f741a88e19"
output = ""
for (let i = 0; i < input.length; i++) {
  if (parseInt(input[i])) {
    output += input[i]
  } else {
    output += input[i].charCodeAt(0).toString()
  }
}
console.log(output)