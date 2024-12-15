package com.mealmate.app.ui.matching

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.mealmate.app.data.location.LocationService
import com.mealmate.app.databinding.FragmentUserMatchingBinding
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class UserMatchingFragment : Fragment(), OnMapReadyCallback {
    private var _binding: FragmentUserMatchingBinding? = null
    private val binding get() = _binding!!

    private val viewModel: UserMatchingViewModel by viewModels()
    private var mapView: MapView? = null
    private var googleMap: GoogleMap? = null

    @Inject
    lateinit var locationService: LocationService

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentUserMatchingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupMapView(savedInstanceState)
        setupLocationUpdates()
        observeViewModel()
    }

    private fun setupMapView(savedInstanceState: Bundle?) {
        mapView = binding.mapView.apply {
            onCreate(savedInstanceState)
            getMapAsync(this@UserMatchingFragment)
        }
    }

    private fun setupLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            locationService.locationFlow.collect { location ->
                location?.let { viewModel.findNearbyUsers(it) }
            }
        }
    }

    private fun observeViewModel() {
        viewModel.nearbyUsers.observe(viewLifecycleOwner) { users ->
            // Update map markers and RecyclerView
        }
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map
        if (ActivityCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            googleMap?.isMyLocationEnabled = true
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        mapView?.onDestroy()
        mapView = null
        _binding = null
    }
}
