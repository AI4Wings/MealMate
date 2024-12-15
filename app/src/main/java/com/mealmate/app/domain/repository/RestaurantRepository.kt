package com.mealmate.app.domain.repository

import com.google.android.gms.maps.model.LatLng
import com.mealmate.app.data.model.Restaurant
import com.mealmate.app.data.model.Review
import kotlinx.coroutines.flow.Flow

interface RestaurantRepository {
    suspend fun getNearbyRestaurants(location: LatLng, radiusInMeters: Double): Flow<List<Restaurant>>
    suspend fun getRestaurantById(restaurantId: String): Restaurant?
    suspend fun addReview(restaurantId: String, review: Review)
    suspend fun getDishReviews(restaurantId: String, dishId: String): Flow<List<Review>>
    suspend fun searchRestaurants(query: String, location: LatLng?): Flow<List<Restaurant>>
}
