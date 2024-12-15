package com.mealmate.app.domain.usecase

import com.google.android.gms.maps.model.LatLng
import com.mealmate.app.data.model.Restaurant
import com.mealmate.app.data.model.Review
import com.mealmate.app.domain.repository.RestaurantRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class RestaurantUseCase @Inject constructor(
    private val restaurantRepository: RestaurantRepository
) {
    suspend fun getNearbyRestaurants(location: LatLng, radius: Double): Flow<List<Restaurant>> {
        return restaurantRepository.getNearbyRestaurants(location, radius)
    }

    suspend fun getRestaurantDetails(restaurantId: String): Restaurant? {
        return restaurantRepository.getRestaurantById(restaurantId)
    }

    suspend fun addReview(restaurantId: String, review: Review) {
        restaurantRepository.addReview(restaurantId, review)
    }

    suspend fun searchRestaurants(query: String, location: LatLng?): Flow<List<Restaurant>> {
        return restaurantRepository.searchRestaurants(query, location)
    }
}
