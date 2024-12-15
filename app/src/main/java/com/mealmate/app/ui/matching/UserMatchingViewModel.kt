package com.mealmate.app.ui.matching

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.android.gms.maps.model.LatLng
import com.mealmate.app.data.model.User
import com.mealmate.app.domain.usecase.UserMatchingUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class UserMatchingViewModel @Inject constructor(
    private val userMatchingUseCase: UserMatchingUseCase
) : ViewModel() {
    private val _nearbyUsers = MutableLiveData<List<User>>()
    val nearbyUsers: LiveData<List<User>> = _nearbyUsers

    private val _matchingError = MutableLiveData<String>()
    val matchingError: LiveData<String> = _matchingError

    fun findNearbyUsers(location: LatLng) {
        viewModelScope.launch {
            try {
                userMatchingUseCase.findNearbyUsers(location, SEARCH_RADIUS)
                    .collect { users ->
                        _nearbyUsers.value = users
                    }
            } catch (e: Exception) {
                _matchingError.value = "Failed to find nearby users: ${e.message}"
            }
        }
    }

    fun initiateMatch(initiatorId: String, participantIds: List<String>, restaurantId: String) {
        viewModelScope.launch {
            try {
                userMatchingUseCase.initiateMatch(initiatorId, participantIds, restaurantId)
            } catch (e: Exception) {
                _matchingError.value = "Failed to initiate match: ${e.message}"
            }
        }
    }

    companion object {
        private const val SEARCH_RADIUS = 5000.0 // 5km radius
    }
}
