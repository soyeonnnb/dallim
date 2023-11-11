package com.dallim.theme

class test {
    class Person(
        val name: String,
        var age: Int,
    ) {

        fun isAdult(): Boolean{
            return this.age >= 20
        }

        init {
            if (age < 0) {
                throw IllegalArgumentException("나이는 ${age}일 수가 없습니다.")
            }
        }

        constructor(name: String) : this(name, 1)
    }
}
    fun main() {
        val person1 = test.Person("박기현", 15)
        if(!person1.isAdult()){
            person1.age = 25
            println(person1.age)
        }
        println(person1.age)
    }
