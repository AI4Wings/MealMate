package com.mealmate.app.data.model

import com.google.android.gms.maps.model.LatLng

data class Restaurant(
    val restaurantId: String,
    val name: String,
    val location: LatLng,
    val rating: Float,
    val dishes: List<Dish>,
    val address: String,
    val phoneNumber: String,
    val businessHours: String,
    val reviews: List<Review>
)

data class Dish(
    val dishId: String,
    val name: String,
    val description: String,
    val price: Double,
    val imageUrl: String?,
    val category: String,
    val isAvailable: Boolean,
    val rating: Float,
    val reviews: List<Review>
)

data class Review(
    val reviewId: String,
    val userId: String,
    val rating: Float,
    val comment: String,
    val timestamp: Long,
    val images: List<String>?
)
