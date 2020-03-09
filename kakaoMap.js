const geoOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  // console.log(pos);
  const crd = pos.coords;
  const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  const currentPosition = new kakao.maps.LatLng(crd.latitude, crd.longitude);
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: currentPosition, //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };

  const map = new kakao.maps.Map(container, options);

  const places = new kakao.maps.services.Places();

  const searchOptions = {
    location: currentPosition,
    useMapCenter: true,
    useMapBounds: true,
    radius: 5000,
    size: 15,
    page: 2
  };

  const mMarker = new kakao.maps.Marker({
    position: currentPosition, // 지도의 중심좌표에 올립니다.
    map: map // 생성하면서 지도에 올립니다.
  });

  const mLabel = new kakao.maps.InfoWindow({
    position: currentPosition, // 지도의 중심좌표에 올립니다.
    content: '내 위치' // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
  });
  mLabel.open(map, mMarker);

  const callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);

      result.forEach(element => {
        const x = parseFloat(element.x);
        const y = parseFloat(element.y);
        console.log(element);

        const markers = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(y, x)
        });

        const labels = new kakao.maps.InfoWindow({
          position: markers.position, // 지도의 중심좌표에 올립니다.
          content: element.place_name // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
        });
        labels.open(map, markers); // 지도에 올리면서, 두번째 인자로 들어간 마커 위에 올라가도록 설정합니다.

        markers.setMap(map);
      });
    }
  };

  places.keywordSearch('카페', callback, searchOptions);
}

function error() {
  console.log('error');
}

navigator.geolocation.getCurrentPosition(success, error, geoOptions);
