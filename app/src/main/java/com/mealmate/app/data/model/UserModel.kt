package com.mealmate.app.data.model

import com.google.android.gms.maps.model.LatLng

data class User(
    val userId: String,
    val username: String,
    val location: LatLng?,
    val preferences: Map<String, Any>,
    val status: UserStatus
)

enum class UserStatus {
    AVAILABLE,
    BUSY,
    OFFLINE
}

data class UserMatch(
    val matchId: String,
    val initiator: User,
    val participants: List<User>,
    val restaurant: Restaurant,
    val status: MatchStatus,
    val createdAt: Long
)

enum class MatchStatus {
    PENDING,
    ACCEPTED,
    DECLINED,
    COMPLETED
}
