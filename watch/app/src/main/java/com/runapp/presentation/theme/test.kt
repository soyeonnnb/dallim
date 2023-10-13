package com.runapp.presentation.theme

class test {
    fun repeat(str: String, num: Int, useNewLine: Boolean){
        for(i in 1..num){
            if(useNewLine){
                println(str)
            }else{
                print(str)
            }
        }
    }
}

fun main(){
    val test = test()
    println(test.repeat("안녕하세요", 5, false))
}