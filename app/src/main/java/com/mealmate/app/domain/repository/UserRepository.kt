package com.mealmate.app.domain.repository

import com.google.android.gms.maps.model.LatLng
import com.mealmate.app.data.model.User
import kotlinx.coroutines.flow.Flow

interface UserRepository {
    suspend fun getNearbyUsers(location: LatLng, radiusInMeters: Double): Flow<List<User>>
    suspend fun updateUserLocation(userId: String, location: LatLng)
    suspend fun updateUserStatus(userId: String, status: String)
    suspend fun getUserById(userId: String): User?
    suspend fun createUserMatch(initiatorId: String, participantIds: List<String>, restaurantId: String)
}
