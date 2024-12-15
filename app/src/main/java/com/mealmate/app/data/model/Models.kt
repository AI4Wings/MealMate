package com.mealmate.app.data.model

data class User(
    val id: String,
    val name: String,
    val latitude: Double,
    val longitude: Double,
    val rating: Float
)

data class Restaurant(
    val id: String,
    val name: String,
    val latitude: Double,
    val longitude: Double,
    val rating: Float,
    val cuisine: String,
    val priceRange: String
)

data class MealGroup(
    val id: String,
    val restaurantId: String,
    val members: List<User>,
    val createdAt: Long
)
