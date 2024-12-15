package com.mealmate.app.domain.usecase

import com.mealmate.app.data.model.User
import com.mealmate.app.data.model.Restaurant
import com.mealmate.app.domain.repository.UserRepository
import com.mealmate.app.domain.repository.RestaurantRepository
import com.mealmate.app.domain.repository.MealGroupRepository
import javax.inject.Inject

class FindNearbyUsersUseCase @Inject constructor(
    private val userRepository: UserRepository
) {
    suspend operator fun invoke(latitude: Double, longitude: Double): List<User> =
        userRepository.findNearbyUsers(latitude, longitude)
}

class GetNearbyRestaurantsUseCase @Inject constructor(
    private val restaurantRepository: RestaurantRepository
) {
    suspend operator fun invoke(latitude: Double, longitude: Double): List<Restaurant> =
        restaurantRepository.getRestaurants(latitude, longitude)
}

class JoinMealGroupUseCase @Inject constructor(
    private val mealGroupRepository: MealGroupRepository
) {
    suspend operator fun invoke(groupId: String): Result<Unit> =
        mealGroupRepository.joinGroup(groupId)
}
