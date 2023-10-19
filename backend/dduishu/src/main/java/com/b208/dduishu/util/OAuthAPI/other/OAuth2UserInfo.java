package com.b208.dduishu.util.OAuthAPI.other;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();

    String getImagePath();
}
