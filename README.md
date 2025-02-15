<p align="middle" >
  <img width="100px;" src="https://em-content.zobj.net/thumbs/160/apple/81/artist-palette_1f3a8.png"/>
</p>
<h2 align="middle">프론트엔드의 렌더링 방식</h2>


# 🎯 2단계 - 렌더링 방식 탐구 및 비교 분석

## 렌더링 시점 비교
메인페이지는 SSG, 진행 페이지는 SSR을 의도했으므로 이 두가지 사항과 SPA를 비교하며 설명하겠습니다.

### SPA
- SPA는 Single Page Application의 약자로, 단일 웹페이지로 돌아가는 애플리케이션입니다.
- 빈 html과 번들 js 파일을 사이트 최초 접근시에 한 번에 내려받아 렌더링하는 방식입니다.
- 최초 접근시 한 번만 렌더링 요소들을 받아오면 그 이후로는 렌더링을 위해 서버와 통신을 할 필요가 없으므로 페이지 전환시 매우 부드러운 사용자 경험을 줄 수 있습니다.
- 그러나 렌더링 요소들을 한 번에 받아와야 하므로 초기 로딩시간이 길고, 처음에 빈 index.html 파일만 받으므로 검색 엔진 최적화 측면에서도 상당히 불리하다는 단점이 있습니다.

### SSR
- SSR은 Server-Side Rendering의 약자로, 서버 측에서 웹페이지를 렌더링하는 애플리케이션입니다.
- SPA와의 차이점은 렌더링 요소들을 미리 받아오는게 아니라, 클라이언트로부터 요청이 올 때 마다 실시간으로 페이지를 만들어냅니다.
- 필요한 요소들을 요청시마다 받으므로 초기 로딩속도가 SPA보다 빠르고, 변경된 데이터가 페이지 요청시 바로 반영되므로 데이터가 자주 변하는 서비스에 적합합니다. 또한 검색 엔진 쵝적화에 이점이 있습니다.
- 그러나 페이지 전환시마다 서버로 요청을 보내야 하므로 SPA나 SSG보다는 좀 무겁다는 단점이 있고, 페이지 전환시 받는 데이터가 아닌, 사용자 인터랙션 같이 이벤트로 바뀌는 데이터를 업데이트하기에는 비용이 많이 든다는 단점이 있습니다.

### SSG
- SSG는 Static Site Generator의 약자로, 정적 사이트 생성기라고 번역할 수 있습니다.
- 웹페이지들을 빌드시에 미리 만들어 놓고, 클라이언트로부터 요청이오면 만들어놓은 페이지를 그대로 전달해주는 방식입니다.
- 초기 로딩 속도, 페이지 전환시 로딩 속도 모두 빠르다는 장점을 가지고 있습니다.
- 블로그나 제품 정보 페이지와 같이 컨텐츠가 자주 바뀌지 않는 페이지에 적합합니다.
- 그러나 SSG는 빌드 시점에 렌더링을 미리 해놓는 방식이다보니 컨텐츠가 자주 업데이트되는 페이지에 사용하기엔 비효율적이라는 단점이 있습니다.

### 사용자 경험(UX) 측면 분석
- 실제 미션은 styled-components 사용으로 인해 강제 CSR 방식이 되었지만, 의도했던 SSR과 SSG를 성공적으로 구현했다고 가정 하에 분석을 진행하겠습니다.
- 컨텐츠가 거의 변하지 않는 페이지인 메인 페이지는 SSG 방식으로 선택했습니다.
- 원래 서비스에서는 메인 페이지 접근 시간이 꽤 길었는데, 미션 서비스에서는 SSG 방식으로 렌더링을 미리 해놓기 때문에 사용자 입장에서 초기에 기다리는 시간을 매우 줄일 수 있을 것으로 예상합니다.
- 진행 페이지는 SSR 방식을 선택했습니다.
- 기존에는 내가 쓴 목표 데이터를 렌더링 후에 불러오는데, 서버에서 미리 불러온다면 훨씬 빠른 속도로 렌더링이 될 것으로 예상합니다.

### 성능 측정 및 비교
### 실제 하루스터디 메인 페이지 측정 결과
![스크린샷 2023-10-16 오후 5 35 29](https://github.com/woo-jk/frontend-rendering/assets/73513965/0ad9cfef-5077-401c-9d8c-67ac377cb3ab)
### 클론 하루스터디 메인 페이지 측정 결과
![스크린샷 2023-10-16 오후 5 35 42](https://github.com/woo-jk/frontend-rendering/assets/73513965/73f69067-4c6f-4a2e-b004-411ce37e4e26)

클론 하루스터디의 성능이 더 낮게 나오는 이유는, 제가 실수로 styled-components의 스타일 요소를 미리 불러오는 설정을 안해줘서 그런 것 같습니다.. 이 설정이 없으니 Layout Shift 점수가 엄청 높게나오는 문제가 있더라구요.

![스크린샷 2023-10-16 오후 5 38 17](https://github.com/woo-jk/frontend-rendering/assets/73513965/3a1056ac-af3b-43f4-9a51-7a6d3d0c09e3)

조만간 해당 스타일 설정을 한 후에 다시 측정해서 업로드하겠습니다!

성능 부분을 제외하면 모든 부분에서 클론 사이트의 점수가 높게 나오는 것을 볼 수 있네요!
