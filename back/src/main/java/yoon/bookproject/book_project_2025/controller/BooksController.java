package yoon.bookproject.book_project_2025.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yoon.bookproject.book_project_2025.dto.BookInfoDto;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@Tag(name = "Books", description = "책 관련 API")
public class BooksController {

    private static final String CLIENT_ID = "dUa87s3mi_RA_aObO6Zn";
    private static final String CLIENT_SECRET = "heKE0AYVn_";

    @GetMapping("/search")
    @Operation(summary = "책 검색", description = "책을 검색하는 API")
    public ResponseEntity<List<BookInfoDto>> searchBooks(@RequestParam("keyword") String keyword) {
        List<BookInfoDto> bookSummaryDtoList = new ArrayList<>();

        try {
            // 검색어를 URL 인코딩
            String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String apiURL = "https://openapi.naver.com/v1/search/book.json?query=" + encodedKeyword;

            // 네이버 API 호출
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("X-Naver-Client-Id", CLIENT_ID);
            con.setRequestProperty("X-Naver-Client-Secret", CLIENT_SECRET);

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == HttpURLConnection.HTTP_OK) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream(), StandardCharsets.UTF_8));
            }

            StringBuilder response = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line);
            }
            br.close();

            // JSON 파싱 (org.json 라이브러리 사용)
            JSONObject jsonObject = new JSONObject(response.toString());
            JSONArray items = jsonObject.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                String title = item.getString("title");
                String author = item.getString("author");
                String publisher = item.getString("publisher");
                String link = item.getString("link");
                String isbn = item.getString("isbn");
                String image = item.getString("image");
                String description = item.getString("description");

                // BookSummaryDto 생성 (빌더 사용)
                BookInfoDto dto = BookInfoDto.builder()
                        .title(title)
                        .author(author)
                        .publisher(publisher)
                        .link(link)
                        .isbn(isbn)
                        .image(image)
                        .description(description)
                        .build();
                bookSummaryDtoList.add(dto);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.ok(bookSummaryDtoList);
    }
}
