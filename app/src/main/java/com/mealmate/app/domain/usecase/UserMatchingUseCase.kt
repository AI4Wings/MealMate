package com.mealmate.app.domain.usecase

import com.google.android.gms.maps.model.LatLng
import com.mealmate.app.data.model.User
import com.mealmate.app.domain.repository.UserRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class UserMatchingUseCase @Inject constructor(
    private val userRepository: UserRepository
) {
    suspend fun findNearbyUsers(location: LatLng, radius: Double): Flow<List<User>> {
        return userRepository.getNearbyUsers(location, radius)
    }

    suspend fun initiateMatch(
        initiatorId: String,
        participantIds: List<String>,
        restaurantId: String
    ) {
        userRepository.createUserMatch(initiatorId, participantIds, restaurantId)
    }
}
