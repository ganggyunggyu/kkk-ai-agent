export const INTRO_MARKDOWN: Record<string, string> = {
  clean: `# 깨끗이 모드

기본 프롬프트가 없는 API 요청입니다.

*원하시는 텍스트를 입력해주세요.*`,

  synonym: `# 유사어 분석

단어와 표현의 유사어를 분석하고 제안합니다. 문맥에 맞는 적절한 대체어를 찾아드립니다.

**주요 기능**
- 유사어 목록 제시
- 뉘앙스 차이 설명
- 문맥별 적합도 분석
- 사용 예시 제공

*분석할 단어나 표현을 입력해주세요.*`,

  review: `# 독후감 비평

글에 대한 심층적이고 객관적인 비평을 제공합니다. 문체, 구조, 논리성을 종합적으로 분석합니다.

**주요 기능**
- 문장별 세밀한 분석
- 객관적 팩트 기반 피드백
- 구체적인 개선안 제시
- 대안 문장 예시 제공

*비평받고 싶은 글을 입력해주세요.*`,

  news: `# 실시간 소식

최신 뉴스와 정보를 검색하고 요약해드립니다. 신뢰할 수 있는 출처의 정보를 제공합니다.

**주요 기능**
- 실시간 뉴스 검색
- 다양한 출처 종합
- 핵심 내용 요약
- 관련 링크 제공

*궁금한 주제나 키워드를 입력해주세요.*`,

  deep_search: `# 딥 서치

심층적인 정보 탐색과 분석을 수행합니다. 복잡한 주제에 대한 포괄적인 답변을 제공합니다.

**주요 기능**
- 다각도 정보 수집
- 논리적 분석 및 종합
- 근거 기반 결론 도출
- 참고 자료 제시

*탐구하고 싶은 주제를 입력해주세요.*`,
};

export const DEFAULT_INTRO = INTRO_MARKDOWN.clean;

export const MSG_COPY_SUCCESS = '복사 성공';
export const MSG_COPY_FAIL = '복사 실패';
export const MSG_DOWNLOAD_SUCCESS = '다운로드가 완료되었습니다.';
export const MSG_DOWNLOAD_FAIL = '다운로드에 실패하였습니다.';
export const MSG_ZIP_DOWNLOAD_SUCCESS =
  '선택된 원고가 압축 파일로 저장되었습니다.';
export const MSG_ZIP_DOWNLOAD_FAIL = '압축 파일 생성에 실패했습니다.';
export const MSG_WARN_ENTER_KEYWORD = '키워드를 입력해주세요.';
