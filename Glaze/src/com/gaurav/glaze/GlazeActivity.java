/*
 * Copyright 2012 Gaurav Ganoo. (9gaurav)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @auther Gaurav Ganoo
 * @version 1.0v
 */
package com.gaurav.glaze;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.gesture.Gesture;
import android.gesture.GestureOverlayView;
import android.gesture.GestureOverlayView.OnGesturePerformedListener;
import android.gesture.GestureOverlayView.OnGesturingListener;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.Canvas;
import android.graphics.Picture;
import android.graphics.drawable.PictureDrawable;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.preference.Preference;
import android.preference.Preference.OnPreferenceClickListener;
import android.util.Base64;
import android.view.GestureDetector.OnGestureListener;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Toast;

public class GlazeActivity extends Activity {
    /** Called when the activity is first created. */
	 WebView webView;  
	 private static final String JAVASCRIPT = "javascript:";
	  private Handler handler = null;  
	  private static final String HTML_ROOT = "file:///android_asset/www/";		// path to html pages
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Initialize the WebView  
        webView = new WebView(this);  
        webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        webView.getSettings().setSupportZoom(false);
      //  webView.setVerticalScrollBarEnabled(false);
      //  webView.setHorizontalScrollBarEnabled(false);
       
        
        setContentView(webView);
        webView.getSettings().setJavaScriptEnabled(true);      
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
      
        handler = new Handler();  
    
        // Bind this object as a JavaScript object  
        webView.addJavascriptInterface(this, "glazeInterface");          
    
        // Load index.html  
        loadPage("index.html");  
    }
    
    
    public void loadPage(String in){
    	final String url = HTML_ROOT + in;
    	loadURL(url);
    }
    
    private void loadURL(final String in){
    	handler.post(new Runnable() {
            public void run() {
            	webView.loadUrl(in);
            }
        });
    }


	


	public void saveFile(String fileName, String format, String barheight){
		try {
	//	byte[] imageBytes = Base64.decode(base64Img, 0);
			Picture pic = webView.capturePicture();
		
		Bitmap bmp = pictureDrawable2Bitmap(new PictureDrawable(pic),Integer.parseInt(barheight)); 
		String root = Environment.getExternalStorageDirectory().toString();
		new File(root + "/Glaze/Art").mkdirs();
        FileOutputStream out = new FileOutputStream(root+"/Glaze/Art/"+fileName+"."+format);
       // bmp.
        
        if(format.equalsIgnoreCase("png")){
        	
        	  bmp.compress(Bitmap.CompressFormat.PNG, 90, out); 
        }else
        	if(format.equalsIgnoreCase("jpeg")){
        		
        		 bmp.compress(Bitmap.CompressFormat.JPEG, 90, out); 
        	}
      
        out.flush();
        out.close();
        Context context = getApplicationContext();
        Toast.makeText(context, "Image Saved Successfully! at "+root+"/Glaze/Art/"+fileName+"."+format , Toast.LENGTH_SHORT);
        
       // final String callbackFunction = "javascript:fileSaved('"+root+"/Glaze/Art/"+fileName+"."+format + "');";  
       // webView.loadUrl(callbackFunction);
	   // loadURL(callbackFunction);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		  
    }
	private static Bitmap pictureDrawable2Bitmap(PictureDrawable pictureDrawable, int barheight){
        Bitmap bitmap = Bitmap.createBitmap(pictureDrawable.getIntrinsicWidth(),pictureDrawable.getIntrinsicHeight(), Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        canvas.drawPicture(pictureDrawable.getPicture());
        
        Bitmap bitmapCroped = Bitmap.createBitmap(bitmap, 0, 0, pictureDrawable.getIntrinsicWidth(), pictureDrawable.getIntrinsicHeight()-barheight-5);
        return bitmapCroped;
    }
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {

	    if (keyCode == KeyEvent.KEYCODE_BACK) {
	        // close image gallery
	    	finish();
	        return true; // this avoids passing to super
	    }

	    return super.onKeyDown(keyCode, event);
	}

	

    
    
    
}