package com.mealmate.app.domain.repository

import com.mealmate.app.data.model.User
import com.mealmate.app.data.model.Restaurant
import com.mealmate.app.data.model.MealGroup

interface UserRepository {
    suspend fun findNearbyUsers(latitude: Double, longitude: Double): List<User>
    suspend fun getCurrentUser(): User
    suspend fun updateUserLocation(latitude: Double, longitude: Double)
}

interface RestaurantRepository {
    suspend fun getRestaurants(latitude: Double, longitude: Double): List<Restaurant>
    suspend fun getRestaurantDetails(id: String): Restaurant
}

interface MealGroupRepository {
    suspend fun createGroup(restaurantId: String): Result<String>
    suspend fun joinGroup(groupId: String): Result<Unit>
    suspend fun getGroupMembers(groupId: String): List<User>
}
