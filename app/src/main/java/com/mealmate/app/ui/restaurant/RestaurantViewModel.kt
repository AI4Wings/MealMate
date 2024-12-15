package com.mealmate.app.ui.restaurant

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.mealmate.app.data.model.Restaurant
import com.mealmate.app.domain.usecase.GetNearbyRestaurantsUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RestaurantViewModel @Inject constructor(
    private val getNearbyRestaurantsUseCase: GetNearbyRestaurantsUseCase
) : ViewModel() {

    private val _restaurants = MutableLiveData<List<Restaurant>>()
    val restaurants: LiveData<List<Restaurant>> = _restaurants

    private val _error = MutableLiveData<String>()
    val error: LiveData<String> = _error

    fun loadNearbyRestaurants(latitude: Double, longitude: Double) {
        viewModelScope.launch {
            try {
                val nearbyRestaurants = getNearbyRestaurantsUseCase(latitude, longitude)
                _restaurants.value = nearbyRestaurants
            } catch (e: Exception) {
                _error.value = e.message ?: "Failed to load restaurants"
            }
        }
    }
}
