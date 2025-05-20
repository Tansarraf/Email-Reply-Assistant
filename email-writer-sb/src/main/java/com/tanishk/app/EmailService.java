package com.tanishk.app;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailService {
	
	@Value("${gemini.api.url}")
	private String geminiURL;
	@Value("${gemini.api.key}")
	private String geminiApiKey;
	
	private final WebClient webClient;
	
	public EmailService(WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder.build();
	}

	public String generateEmailReply(EmailRequest emailRequest) {
		
		//Build the prompt
		String prompt = buildPrompt(emailRequest);
		
		//Craft the request
		Map<String, Object> requestBody = Map.of(
				"contents",new Object[] {
						Map.of("parts", new Object[] {
								Map.of("text",prompt)
						})
				});
				
		//Perform the request and get response
		String response = webClient.post()
				 .uri(geminiURL+geminiApiKey)
				.header("Content-Type", "application/json")
				.bodyValue(requestBody)
				.retrieve()
				.bodyToMono(String.class)
				.block();
		//Return the response
		return extractResponse(response);
	}

	//Extract and return the response
	private String extractResponse(String response) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode rootNode = mapper.readTree(response);
			return rootNode.path("candidates")
					.get(0)
					.path("content")
					.path("parts")
					.get(0)
					.path("text")
					.asText();
		}catch(Exception e){
			return "Error processing request: " + e.getMessage();
		}
	}

	private String buildPrompt(EmailRequest emailRequest) {
		StringBuilder prompt = new StringBuilder();
		prompt.append("Generate a professional email reply for the following email content. Please do not generate the subject line.");
		if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
			prompt.append("Use a").append(emailRequest.getTone()).append(" tone.");
		}
		prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
		return prompt.toString();
	}

}
